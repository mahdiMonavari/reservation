import connectionToDB from "@/utiles/DB/connection";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import doctorModel from "../../../../../../model/doctor";
import canDoctorActiveValidation from "../../../../../../validators/backend/checkDoctor";

export async function PUT(req, { params }) {
  try {
    await connectionToDB();
    const cookiceStore = await cookies();
    const token = cookiceStore.get("token")?.value;
    const { role } = verifyAccessToken(token);
    if (role !== "ADMIN") {
      return Response.json({ message: "not Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const doctor = await doctorModel.findOne({ userId: id });
    let doctorEdited;
    if (doctor.isActive === true) {
      doctorEdited = await doctorModel.findByIdAndUpdate(
        doctor._id, // از همون doctor که بالا گرفتی استفاده کن
        { isActive: false },
        { new: true } // returnDocument معتبر نیست، باید new: true باشه
      );
      return Response.json(
        { message: "doctor unActived", data: doctorEdited },
        { status: 200 }
      );
    }
    const canDoctorActive = canDoctorActiveValidation(doctor);
    if (canDoctorActive) {
      doctorEdited = await doctorModel.findByIdAndUpdate(
        doctor._id,
        { isActive: true },
        { new: true }
      );
      return Response.json(
        { message: "doctor actived", data: doctorEdited },
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "doctor field is not comeletly yet" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
