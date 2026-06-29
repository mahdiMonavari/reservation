import appointmentModel from "../../../../../model/appointment";
import connectionToDB from "@/utiles/DB/connection";
import Validator from "fastest-validator";
import userModel from "../../../../../model/user";
import serviceModel from "../../../../../model/service";
import doctorModel from "../../../../../model/doctor";

const v = new Validator();

const updateSchema = v.compile({
  description: { type: "string", min: 1, max: 2000, optional: true },
  isVisited: { type: "boolean", optional: true },
  $$strict: true,
});

export async function PUT(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;

    if (!id || id.length !== 24) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }

    const body = await req.json();

    const isValid = updateSchema(body);
    if (isValid !== true) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }

    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );

    if (!appointment) {
      return Response.json({ message: "not found" }, { status: 404 });
    }

    return Response.json({ message: "updated", data: appointment });
  } catch {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
export async function GET(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;

    if (!id || id.length !== 24) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }
    const userAppointments = await appointmentModel
      .find({ userId: id })
      .populate("doctorId", "firstName lastName")
      .populate("serviceIds", "title duration")
      .sort({ date: -1 })
      .lean();
    return Response.json(
      { message: "success", data: userAppointments },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
