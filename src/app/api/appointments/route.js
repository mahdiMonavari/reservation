// app/api/appointments/route.js
import appointmentModel from "../../../../model/appointment";
import connectionToDB from "@/utiles/DB/connection";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";
import userModel from "../../../../model/user";
import { appointmentValidator } from "../../../../validators/backend/appointmentValidator";

export async function POST(req) {
  try {
    await connectionToDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const { phone } = verifyAccessToken(token);
    const user = await userModel.findOne({ phoneNumber: "09137374644" }, "_id");
    if (!user) {
      return Response.json({ message: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      userId,
      serviceIds,
      totalTime,
      timeStart,
      timeEnd,
      doctorId,
      date,
    } = body;
    const isValid = appointmentValidator({
      userId,
      serviceIds,
      doctorId,
      totalTime,
      timeStart,
      timeEnd,
      date: new Date(date),
    });
    if (isValid !== true) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }

    const appointment = await appointmentModel.create({
      userId,
      doctorId,
      serviceIds: serviceIds ?? [],
      totalTime,
      timeStart,
      timeEnd,
      date,
    });

    return Response.json(
      { message: "created", data: appointment },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
