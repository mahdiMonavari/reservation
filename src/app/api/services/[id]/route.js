import connectionToDB from "@/utiles/DB/connection";
import { ServiceValidator } from "../../../../../validators/backend/serviceValidator";
import serviceModel from "../../../../../model/service";

export async function PUT(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;
    const { title, doctorId, price, duration, description } = await req.json();

    const isValidData = ServiceValidator({
      title,
      doctorId,
      price,
      duration,
    });
    if (isValidData !== true) {
      return Response.json({ message: "bad request " }, { status: 400 });
    }
    const editedService = await serviceModel.findOneAndUpdate(
      { _id: id },
      { title, doctorId, price, duration, description },
      { new: true }
    );
    return Response.json({ message: "edit successfully", data: editedService });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
