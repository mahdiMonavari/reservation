import otpModel from "../../../../../model/otp";

export async function POST(req) {
  try {
    const { otp, phone } = await req.json();

    const otpRecord = await otpModel.findOne({ phone });

    if (!otpRecord) {
      return Response.json({ message: "درخواست یافت نشد" }, { status: 404 });
    }

    if (otpRecord.attempt < 0) {
      await otpModel.deleteOne({ phone });
      return Response.json(
        {
          message:
            "تعداد تلاش‌های شما به پایان رسیده است. لطفا دوباره درخواست دهید.",
        },
        { status: 429 },
      );
    }

    if (otpRecord.code !== String(otp)) {
      const updatedRecord = await otpModel.findOneAndUpdate(
        { phone },
        { $inc: { attempt: -1 } },
        { new: true },
      );

      return Response.json(
        {
          message: `کد وارد شده اشتباه است. تلاش‌های باقی‌مانده: ${updatedRecord.attempt}`,
        },
        { status: 400 },
      );
    }
    const now = new Date();
    if (otpRecord.expTime < now) {
      await otpModel.deleteOne({ phone });
      return Response.json(
        { message: "زمان کد تایید به پایان رسیده است" },
        { status: 410 },
      );
    }

    await otpModel.deleteOne({ phone });
    return Response.json({ message: "کد تایید شد" }, { status: 200 });
  } catch (err) {
    console.error("OTP Verification Error:", err);
    return Response.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}
