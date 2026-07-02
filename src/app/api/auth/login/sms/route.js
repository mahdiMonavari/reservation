import connectionToDB from "@/utiles/DB/connection";
import userModel from "../../../../../../model/user";
import otpModel from "../../../../../../model/otp";
import { generateAccessToken, generateRefreshToken } from "@/utiles/auth/auth";

export async function POST(req) {
  const { otp, phone } = await req.json();
  if (!otp || !phone) {
    return Response.json({ message: "invalid entry" }, { status: 400 });
  }
  if (otp.length !== 5) {
    return Response.json({ message: "code id not valid" }, { status: 400 });
  }
  try {
    await connectionToDB();
    const otpFounded = await otpModel.findOne({ phone });
    if (!otpFounded) {
      return Response.json({ message: "code id not valid" }, { status: 400 });
    }
    if (otpFounded.attempt === 0) {
      await otpModel.deleteOne({ phone });
      return Response.json(
        {
          message:
            "تعداد تلاش‌های شما به پایان رسیده است. لطفا دوباره درخواست دهید.",
        },
        { status: 429 },
      );
    }
    if (otpFounded.code !== otp) {
      await otpModel.findOneAndUpdate(
        { phone },
        { $inc: { attempt: -1 } },
        { new: true },
      );
      return Response.json({ message: "code id not valid" }, { status: 400 });
    }
    const newDate = new Date();

    const isExpired = otpFounded.expTime - newDate > 90000 ? true : false;
    await otpModel.deleteOne({ _id: otpFounded._id });
    if (isExpired) {
      return Response.json({ message: "code is expired" }, { status: 409 });
    }
    const user = await userModel.findOne({ phoneNumber: phone });
    const token = generateAccessToken({ phone, role: user.role });
    const refreshToken = generateRefreshToken({ phone, role: user.role });
    await userModel.findOneAndUpdate({ phoneNumber: phone }, { refreshToken });
    return Response.json(
      { message: "login successfully", data: user },
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            `token=${token}; path=/; httpOnly; Secure; SameSite=Strict`,
            `refreshToken=${refreshToken}; path=/; httpOnly; Secure; SameSite=Strict`,
          ],
        },
      },
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
