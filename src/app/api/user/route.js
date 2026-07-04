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
import { toEnglishDigits } from "@/utiles/auth/convertNumber";

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
    const dataToValidate = { ...body };

    if (dataToValidate.phoneNumber) {
      dataToValidate.phoneNumber = toEnglishDigits(dataToValidate.phoneNumber);
    }
    if (dataToValidate.password) {
      dataToValidate.password = toEnglishDigits(dataToValidate.password);
    }
    const isValid = editValidator({
      firstName: dataToValidate.firstName,
      lastName: dataToValidate.lastName,
      phoneNumber: dataToValidate.phoneNumber,
      password: dataToValidate.password,
    });

    if (isValid !== true) {
      return Response.json(
        { message: "data not valid", errors: isValid },
        { status: 400 },
      );
    }

    if (dataToValidate.phoneNumber && dataToValidate.phoneNumber !== phone) {
      const existingUser = await userModel.findOne({
        phoneNumber: dataToValidate.phoneNumber,
      });
      if (existingUser) {
        return Response.json(
          { message: "این شماره تلفن قبلاً ثبت شده است" },
          { status: 409 },
        );
      }
    }

    const updateData = { ...dataToValidate };

    if (updateData.password) {
      updateData.password = await hashePassword(updateData.password);
    }

    const newPhone = dataToValidate.phoneNumber || phone;
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
      { new: true, select: "-password -refreshToken" },
    );

    const response = Response.json(
      { message: "user updated", data: userInfo },
      { status: 200 },
    );
    const cookieOptions = "HttpOnly; Path=/; SameSite=Lax; Max-Age=";
    response.headers.append(
      "Set-Cookie",
      `token=${accessToken}; ${cookieOptions}${15 * 60}`,
    );
    response.headers.append(
      "Set-Cookie",
      `refreshToken=${refreshToken}; ${cookieOptions}${15 * 24 * 60 * 60}`,
    );

    return response;
  } catch (err) {
    console.error(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
