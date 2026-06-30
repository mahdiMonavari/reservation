import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import userModel from "../../../../../model/user";
import appointmentModel from "../../../../../model/appointment";
import serviceModel from "../../../../../model/service";
import doctorModel from "../../../../../model/doctor";
import connectionToDB from "@/utiles/DB/connection";
import AppointmentPageUserPanel from "@/components/templates/panelUser/appointments/AppointmentPageUserPanel";

async function page({ searchParams }) {
  await connectionToDB();
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const params = await searchParams;
  const page = params.page || 1;
  const search = params.search || "";
  const query =
    search !== ""
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
          ],
          role: { $in: ["ADMIN", "DOCTOR"] },
        }
      : { role: { $in: ["ADMIN", "DOCTOR"] } };
  const [user, doctors] = await Promise.all([
    userModel.findOne({ phoneNumber: phone }),
    userModel.find(query),
  ]);
  if (!user) {
    redirect("/");
  }
  const doctorsId = doctors.map((doctor) => doctor._id);
  const appointments = await appointmentModel
    .find({ userId: user._id, doctorId: { $in: doctorsId } })
    .populate("userId", "firstName lastName")
    .populate("doctorId", "firstName lastName")
    .populate("serviceIds");

  return (
    <AppointmentPageUserPanel
      appointments={JSON.parse(JSON.stringify(appointments))}
    />
  );
}

export default page;
