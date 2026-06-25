import connectionToDB from "@/utiles/DB/connection";
import workingDayModel from "../../../../../model/workingDay";

export async function GET(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;

    const schedules = await workingDayModel.find({ doctorId: id }).lean();

    return Response.json(schedules);
  } catch (error) {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
