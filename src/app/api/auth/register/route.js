import connectionToDB from "@/utiles/DB/connection";
import userModel from "../../../../../model/user";
import { registerValidator } from "../../../../../validators/backend/userValidator";
import {
  generateAccessToken,
  generateRefreshToken,
  hashePassword,
} from "@/utiles/auth/auth";

export async function POST(req) {
  try {
    const { firstName, lastName, phoneNumber, password } = await req.json();
    await connectionToDB();
    const isValidEntry = registerValidator({
      firstName,
      lastName,
      phoneNumber,
      password,
    });
    if (isValidEntry !== true) {
      return Response.json({ message: isValidEntry.error }, { status: 400 });
    }
    const isUserAlready = await userModel.findOne({ phoneNumber });
    if (isUserAlready) {
      return Response.json({ message: "user already exists" }, { status: 409 });
    }
    const usersCount = await userModel.countDocuments();
    const role = usersCount === 0 ? "ADMIN" : "USER";
    const hashedPassword = await hashePassword(password);
    const token = generateAccessToken({ phoneNumber, role });
    const refreshToken = generateRefreshToken({ phoneNumber, role });
    const newUser = await userModel.create({
      firstName,
      lastName,
      password: hashedPassword,
      phoneNumber,
      role,
      refreshToken,
    });
    if (newUser) {
      return Response.json(
        { message: "user created" },
        {
          status: 201,
          headers: {
            "Set-Cookie": [
              `token=${token}; path=/; httpOnly; Secure; SameSite=Strict`,
              `refreshToken=${refreshToken}; path=/; httpOnly; Secure; SameSite=Strict`,
            ],
          },
        }
      );
    }
    return Response.json({ message: "internal error db" }, { status: 500 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
