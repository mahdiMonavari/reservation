import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import React from "react";
import userModel from "../../../../../model/user";
import SchedulePage from "@/components/templates/panelAdmin/schedule/SchedulePage";
import workingDayModel from "../../../../../model/workingDay";
import { getWeekdayOfFirstDayOfMonth } from "@/utiles/jalali/jalali";

async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne({ phoneNumber: phone }, "_id").lean();
  const schedules = await workingDayModel.find({ doctorId: user._id });
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100">
        برنامه حضور
      </h1>
      <SchedulePage schedules={schedules} />
    </div>
  );
}

export default page;
