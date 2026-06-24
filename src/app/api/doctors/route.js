import connectionToDB from "@/utiles/DB/connection";
import doctorModel from "../../../../model/doctor";

export async function GET() {
  await connectionToDB();
  const doctors = await doctorModel.find({ isActive: true }).populate("userId");
  console.log(doctors);
  if (!doctors) {
    return Response.json({ message: "doctor not found" }, { status: 404 });
  }
  return Response.json(doctors);
}
