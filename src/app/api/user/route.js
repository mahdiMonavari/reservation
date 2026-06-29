import {
  generateAccessToken,
  generateRefreshToken,
  hashePassword,
  verifyAccessToken,
} from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import userModel from "../../../../model/user";
import connectionToDB from "@/utiles/DB/connection";
import { editValidator } from "../../../../validators/backend/userValidator";

export async function PUT(req) {
  try {
    await connectionToDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { phone } = verifyAccessToken(token);
    const user = await userModel.findOne({ phoneNumber: phone });
    if (!user) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }

    const body = await req.json();
    const { firstName, lastName, phoneNumber, password } = body;
    const isValid = editValidator({
      firstName,
      lastName,
      phoneNumber,
      password,
    });
    if (isValid !== true) {
      return Response.json(
        { message: "data not valid", errors: isValid },
        { status: 400 }
      );
    }

    if (body.phoneNumber && body.phoneNumber !== phone) {
      const existingUser = await userModel.findOne({
        phoneNumber: body.phoneNumber,
      });
      if (existingUser) {
        return Response.json(
          { message: "این شماره تلفن قبلاً ثبت شده است" },
          { status: 409 }
        );
      }
    }

    const updateData = { ...body };
    if (body.password) {
      updateData.password = await hashePassword(body.password);
    }

    const newPhone = body.phoneNumber || phone;
    const accessToken = generateAccessToken({
      phone: newPhone,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      phone: newPhone,
      role: user.role,
    });
    updateData.refreshToken = refreshToken;

    const userInfo = await userModel.findOneAndUpdate(
      { phoneNumber: phone },
      { ...updateData },
      { new: true, select: "-password -refreshToken" }
    );

    const response = Response.json(
      { message: "user updated", data: userInfo },
      { status: 200 }
    );

    const cookieOptions = "HttpOnly; Path=/; SameSite=Lax; Max-Age=";

    response.headers.append(
      "Set-Cookie",
      `token=${accessToken}; ${cookieOptions}${15 * 60}`
    );
    response.headers.append(
      "Set-Cookie",
      `refreshToken=${refreshToken}; ${cookieOptions}${7 * 24 * 60 * 60}`
    );

    return response;
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
