import connectionToDB from "@/utiles/DB/connection";
import { sendOtpValidator } from "../../../../../validators/backend/otpValidator";
import otpModel from "../../../../../model/otp";
import limitRateModel from "../../../../../model/liimitRate";

export async function POST(req) {
  try {
    await connectionToDB();

    const API_KEY = process.env.API_KEY;
    const PATTERN_CODE = process.env.PATTERN_CODE;
    const FROM_NUMBER = process.env.FROM_NUMBER;

    const { phone } = await req.json();
    const isValidPhoneNumber = sendOtpValidator({ phone });
    if (!isValidPhoneNumber) {
      return Response.json(
        { message: "شماره موبایل معتبر نیست" },
        { status: 400 },
      );
    }

    const limiRatetModelIsExist = await limitRateModel.findOne({
      phone,
      type: "otp",
    });

    if (limiRatetModelIsExist) {
      if (limiRatetModelIsExist.count === 0) {
        return Response.json({ message: "limited per day" }, { status: 429 });
      } else {
        await limitRateModel.findOneAndUpdate(
          { phone, type: "otp" },
          { $inc: { count: -1 } },
        );
      }
    } else {
      await limitRateModel.create({
        phone,
        type: "otp",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
    }

    const existCodeAlready = await otpModel.findOne({ phone });

    if (existCodeAlready && existCodeAlready?.expTime > new Date()) {
      return Response.json(
        { message: "لطفاً کمی صبر کنید، کد قبلی هنوز معتبر است" },
        { status: 409 },
      );
    }

    if (existCodeAlready?.expTime < new Date()) {
      await otpModel.deleteOne({ phone });
    }

    const verificationCode = Math.floor(Math.random() * 90000) + 10000;
    const expiryDate = new Date(Date.now() + 1.5 * 60000);

    const requestBody = {
      code: PATTERN_CODE,
      attributes: { code: verificationCode },
      recipient: phone,
      line_number: FROM_NUMBER,
      number_format: "english",
    };

    const res = await fetch("https://api.iranpayamak.com/ws/v1/sms/pattern", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": API_KEY,
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await res.json();

    if (res.ok) {
      await otpModel.create({
        phone,
        code: verificationCode,
        expTime: expiryDate,
      });

      return Response.json(
        { message: "کد تایید با موفقیت ارسال شد" },
        { status: 200 },
      );
    } else {
      return Response.json(
        { message: result.message || "خطا در ارسال پیامک" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Global Error:", err);
    return Response.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}
