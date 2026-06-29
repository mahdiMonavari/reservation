import otpModel from "../../../../../model/otp";

export async function POST(req) {
  try {
    const { otp, phone } = await req.json();
    const otpFinded = await otpModel.findOne({ code: otp, phone });
    if (!otpFinded) {
      return Response.json({ message: "invalid otp" }, { status: 400 });
    }
    const newTime = new Date();
    const isExp = newTime - otpFinded.expTime > 90000;
    await otpModel.deleteOne({ _id: otpFinded._id });
    if (isExp) {
      return Response.json({ message: "otp is expierd" }, { status: 410 });
    }
    return Response.json({ message: "otp verified" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json("enternal error");
  }
}
