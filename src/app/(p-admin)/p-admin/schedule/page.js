import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import React from "react";
import userModel from "../../../../../model/user";
import SchedulePage from "@/components/templates/panelAdmin/schedule/SchedulePage";
import workingDayModel from "../../../../../model/workingDay";

async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne({ phoneNumber: phone }, "_id").lean();
  const schedules = await workingDayModel.find({ doctorId: user._id }).lean();

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100">
        برنامه حضور
      </h1>
      <SchedulePage
        schedules={JSON.parse(JSON.stringify(schedules))}
        doctorId={user._id.toString()}
      />
    </div>
  );
}

export default page;
