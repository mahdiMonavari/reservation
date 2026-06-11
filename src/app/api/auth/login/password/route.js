import connectionToDB from "@/utiles/DB/connection";
import userModel from "../../../../../../model/user";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utiles/auth/auth";

export async function POST(req) {
  try {
    const { password, phone } = await req.json();
    if (
      password.length < 8 ||
      !phone ||
      phone.length < 11 ||
      !phone.startsWith("09")
    ) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }
    await connectionToDB();
    const user = await userModel.findOne({ phoneNumber: phone });
    if (!user) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }
    const isVerifyPassword = await verifyPassword(password, user.password);
    if (!isVerifyPassword) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }
    const token = generateAccessToken({ phone });
    const refreshToken = generateRefreshToken({ phone });
    await userModel.findOneAndUpdate({ phone }, { refreshToken });
    return Response.json(
      { message: "login successfully" },
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
