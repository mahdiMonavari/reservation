import connectionToDB from "@/utiles/DB/connection";
import doctorModel from "../../../../../model/doctor";

export async function POST(req) {
  try {
    await connectionToDB();
    const reqBody = await req.json();
    const {
      userId,
      specialty,
      about,
      experience,
      avgAppointmentTime,
      baseFee,
      fieldOfStudy,
      isActive,
    } = reqBody;
    const doctorAlreadyExist = await doctorModel.findOne({ userId });
    if (doctorAlreadyExist) {
      return Response.json(
        { message: "already exist doctor" },
        { status: 403 }
      );
    }
    const doctor = await doctorModel.create({
      userId,
      specialty,
      about,
      experience,
      avgAppointmentTime,
      baseFee,
      fieldOfStudy,
      isActive,
    });
    return Response.json({ message: "doctor created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
