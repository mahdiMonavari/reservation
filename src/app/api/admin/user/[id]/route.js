import connectionToDB from "@/utiles/DB/connection";
import { editValidator } from "../../../../../../validators/backend/userValidator";
import userModel from "../../../../../../model/user";

export async function PUT(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;
    const { phoneNumber, firstName, lastName, role } = await req.json();

    const isValidData = editValidator({ phoneNumber, firstName, lastName });
    if (isValidData !== true) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }

    const user = await userModel.findOneAndUpdate(
      { _id: id },
      { phoneNumber, firstName, lastName, role },
      { returnDocument: "after" }
    );
    if (user.role !== "USER") {
      const res = await fetch("http://localhost:3000/api/doctor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });
      if (!res.ok) {
        return Response.json({ message: "internal error" }, { status: 500 });
      }
    }
    return Response.json(
      { message: "user updated", data: user },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;

    const user = await userModel.findOneAndDelete({ _id: id });

    return Response.json(
      { message: "user deleted", data: user },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
