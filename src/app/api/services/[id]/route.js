import connectionToDB from "@/utiles/DB/connection";
import { ServiceValidator } from "../../../../../validators/backend/serviceValidator";
import serviceModel from "../../../../../model/service";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";

export async function PUT(req, { params }) {
  try {
    await connectionToDB();
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthenticated " }, { status: 401 });
    }
    const { role } = verifyAccessToken(token);
    if (role === "ADMIN" || role === "DOCTOR") {
      const { id } = await params;
      const { title, doctorId, price, duration, description, isPopular } =
        await req.json();

      const isValidData = ServiceValidator({
        title,
        doctorId,
        price,
        duration,
        description,
      });
      if (isValidData !== true) {
        return Response.json({ message: "bad request " }, { status: 400 });
      }
      const editedService = await serviceModel.findOneAndUpdate(
        { _id: id },
        { title, doctorId, price, duration, description, isPopular },
        { new: true }
      );
      return Response.json({
        message: "edit successfully",
        data: editedService,
      });
    } else {
      return Response.json({ message: "Unauthenticated " }, { status: 401 });
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectionToDB();
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthenticated " }, { status: 401 });
    }
    const { role } = verifyAccessToken(token);
    if (role === "ADMIN" || role === "DOCTOR") {
      const { id } = await params;
      const deleteService = await serviceModel.findOneAndDelete({ _id: id });
      return Response.json({
        message: "delete successfully",
        data: deleteService,
      });
    } else {
      return Response.json({ message: "Unauthenticated " }, { status: 401 });
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
