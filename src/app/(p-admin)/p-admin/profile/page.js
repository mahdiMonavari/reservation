import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import React from "react";
import userModel from "../../../../../model/user";
import Profle from "@/components/templates/panelAdmin/profile/Profle";
import doctorModel from "../../../../../model/doctor";

async function page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const id = await userModel.findOne({ phoneNumber: phone }, "_id");
  const data = await doctorModel.findOne({ userId: id }).populate("userId");
  const doctor = JSON.parse(JSON.stringify(data));
  return (
    <div>
      <Profle doctor={doctor} />
    </div>
  );
}

export default page;
