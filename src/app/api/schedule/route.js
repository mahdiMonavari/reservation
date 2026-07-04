import connectionToDB from "@/utiles/DB/connection";
import workingDayModel from "../../../../model/workingDay";
import { workingDayValidator } from "../../../../validators/backend/workingDayValidator";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";

export async function POST(req) {
  try {
    await connectionToDB();
    const schedules = await req.json();
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const { role } = verifyAccessToken(token);
    if (role === "USER") {
      return Response.json({ message: "not Unauthorized" }, { status: 401 });
    }
    const isValid = schedules.some((item, index) => {
      const resulte = workingDayValidator({
        doctorId: item.doctorId,
        date: item.date,
        timeStart: item.timeStart,
        timeEnd: item.timeEnd,
      });
      if (resulte !== true) return false;
      if (schedules.length === index + 1) return true;
    });
    if (isValid !== true) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }
    await workingDayModel.deleteMany({ doctorId: schedules[0].doctorId });
    await workingDayModel.insertMany(schedules);
    return Response.json(
      { message: "set working date successfully" },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
