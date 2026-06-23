import connectionToDB from "@/utiles/DB/connection";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import doctorModel from "../../../../../../model/doctor";
import canDoctorActiveValidation from "../../../../../../validators/backend/checkDoctor";
import userModel from "../../../../../../model/user";

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
    if (!doctor) {
      return Response.json({ message: "doctor not found" }, { status: 404 });
    }
    let doctorEdited;
    if (doctor.isActive === true) {
      doctorEdited = await doctorModel.findByIdAndUpdate(
        doctor._id,
        { isActive: false },
        { new: true }
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
export async function DELETE(req, { params }) {
  try {
    await connectionToDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const { role } = verifyAccessToken(token);

    if (role !== "ADMIN") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const doctor = await doctorModel.findOneAndDelete({ userId: id });
    if (!doctor) {
      return Response.json({ message: "doctor not found" }, { status: 404 });
    }

    if (doctor?.photo) {
      try {
        await unlink(path.join(process.cwd(), "public", doctor.photo));
      } catch {}
    }

    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { role: "USER" }
    );
    if (!user) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }
    return Response.json(
      { message: "delete successfully", data: doctor.userId },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
