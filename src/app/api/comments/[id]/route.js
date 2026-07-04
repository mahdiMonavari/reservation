import connectionToDB from "@/utiles/DB/connection";
import commentModel from "../../../../../model/comment";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";

export async function PUT(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const { role } = verifyAccessToken(token);
    if (role === "USER") {
      return Response.json({ message: "not Unauthorized" }, { status: 401 });
    }
    if (!id || id.length !== 24) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }

    const { isVerified } = await req.json();
    if (isVerified === true || isVerified === false) {
      const comment = await commentModel.findByIdAndUpdate(
        { _id: id },
        { isVerified },
        { new: true },
      );
      if (!comment) {
        return Response.json({ message: "comment not found" }, { status: 404 });
      }
      return Response.json({ message: "updated", data: comment });
    } else {
      return Response.json({ message: "bad request" }, { status: 400 });
    }
  } catch {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;

    if (!id || id.length !== 24) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }
    const comment = await commentModel.findByIdAndDelete({ _id: id });
    if (!comment) {
      return Response.json({ message: "comment not found" }, { status: 404 });
    }
    return Response.json({ message: "updated", data: comment });
  } catch {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
