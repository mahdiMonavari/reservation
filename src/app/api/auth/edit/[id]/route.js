import connectionToDB from "@/utiles/DB/connection";
import userModel from "../../../../../../model/user";
import { registerValidator } from "../../../../../../validators/backend/userValidator";

export async function PUT(req, { params }) {
  try {
    connectionToDB();
    const { id } = await params;
    const { phone, firstName, lastName, password } = await req.json();
    const isValidData = registerValidator({
      phone,
      firstName,
      lastName,
      password,
    });
    if (isValidData !== true) {
      return Response.json({ message: "bad request " }, { status: 400 });
    }
    const user = await userModel.findOneAndUpdate(
      { _id: id, phoneNumber: phone },
      { phoneNumber: phone, firstName, lastName, password },
      { new: true }
    );
    return Responce.json(
      { message: "user Updated", data: user },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    connectionToDB();
    const { id } = await params;
    const { phone } = await req.json();
    const user = await userModel.findOneAndUpdate(
      { _id: id, phoneNumber: phone },
      { phoneNumber: phone, firstName, lastName, password },
      { new: true }
    );
    return Responce.json(
      { message: "user deleted", data: user },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
