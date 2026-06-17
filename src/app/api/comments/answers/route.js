// app/api/comments/answers/route.js
import commentModel from "../../../../../model/comment";
import connectionToDB from "@/utiles/DB/connection";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";
import userModel from "../../../../../model/user";
import Validator from "fastest-validator";

const v = new Validator();

const replySchema = v.compile({
  parentId: { type: "string", min: 24, max: 24 },
  text: { type: "string", min: 3, max: 500 },
  $$strict: true,
});

export async function POST(req) {
  try {
    await connectionToDB();

    // doctorId رو از توکن میگیریم نه از کلاینت
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const { phone } = verifyAccessToken(token);
    const doctor = await userModel.findOne({ phoneNumber: phone });

    if (!doctor) {
      return Response.json({ message: "unauthorized" }, { status: 401 });
    }

    const { parentId, text } = await req.json();

    const isValid = replySchema({ parentId, text });
    if (isValid !== true) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }

    const parent = await commentModel.findById(parentId);
    if (!parent) {
      return Response.json({ message: "comment not found" }, { status: 404 });
    }

    const [reply] = await Promise.all([
      commentModel.create({
        parentId,
        text,
        doctorId: doctor._id,
        userId: doctor._id,
      }),
      commentModel.findByIdAndUpdate(parentId, { hasAnswer: true }),
    ]);

    return Response.json({ message: "created", data: reply }, { status: 201 });
  } catch {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
