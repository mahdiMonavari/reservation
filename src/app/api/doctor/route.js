import connectionToDB from "@/utiles/DB/connection";
import doctorModel from "../../../../model/doctor";

export async function POST(req) {
  try {
    await connectionToDB();
    const reqBody = await req.json();
    const {
      userId,
      specialty,
      about,
      rating,
      experience,
      reviewsCount,
      avgAppointmentTime,
      baseFee,
      fieldOfStudy,
      isActive,
    } = reqBody;
    const doctor = await doctorModel.create({
      userId,
      specialty,
      about,
      rating,
      experience,
      reviewsCount,
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
