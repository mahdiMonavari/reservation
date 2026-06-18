import { cookies } from "next/headers";
import React from "react";
import userModel from "../../../../../model/user";
import { verifyAccessToken } from "@/utiles/auth/auth";
import appointmentModel from "../../../../../model/appointment";

async function Appointment({ searchParams }) {
  const params = await searchParams;
  const search = params?.search;
  const page = params?.page || 1;
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne({ phoneNumber: phone }, "_id");
  const inPage = 10;
  const query = search
    ? {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { phoneNumber: { $regex: search } },
        ],
      }
    : {};
  const appointmentsUserId = await userModel.findOne({ ...query }, "_id");
  const [appointments, totlaCount] = await Promise.all([
    appointmentModel
      .find({
        doctorId: user._id,
        userId: appointmentsUserId,
      })
      .skip((page - 1) * inPage)
      .limit(inPage)
      .populate("userId"),
    appointmentModel.countDocuments({ doctorId: user._id, ...query }),
  ]);
  console.log(totlaCount);
  return <div></div>;
}

export default Appointment;
