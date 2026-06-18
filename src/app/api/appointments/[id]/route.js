// app/api/appointments/[id]/route.js
import appointmentModel from "../../../../../model/appointment";
import connectionToDB from "@/utiles/DB/connection";
import Validator from "fastest-validator";

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
