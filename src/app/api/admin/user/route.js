import connectionToDB from "@/utiles/DB/connection";
import userModel from "../../../../../model/user";
import { registerValidator } from "../../../../../validators/backend/userValidator";
import { hashePassword } from "@/utiles/auth/auth";

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
    const role = "USER";
    const hashedPassword = await hashePassword(password);
    const newUser = await userModel.create({
      firstName,
      lastName,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    return Response.json(
      { message: "user created", data: newUser },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
