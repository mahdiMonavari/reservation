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
    const optFounded = await otpModel.findOne({ code: otp, phone });
    if (!optFounded) {
      return Response.json({ message: "code id not valid" }, { status: 400 });
    }
    const newDate = new Date();

    const isExpired = newDate - optFounded.expTime > 90000 ? true : false;
    await otpModel.deleteOne({ _id: optFounded._id });
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
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
