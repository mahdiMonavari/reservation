import connectionToDB from "@/utiles/DB/connection";
import appointmentModel from "../../../../../model/appointment";

export async function POST(req) {
  try {
    await connectionToDB();
    const body = await req.json();

    const { doctorId, date } = body;
    if (!doctorId && !date)
      return Response.json({ message: "bad request" }, { status: 400 });
    const appointments = await appointmentModel.find(
      { doctorId, date },
      "timeStart timeEnd",
    );
    if (appointments) {
      return Response.json(appointments);
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
