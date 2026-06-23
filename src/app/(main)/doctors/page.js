import Doctors from "@/components/templates/doctors/Doctors";
import React from "react";
import doctorModel from "../../../../model/doctor";

async function page() {
  const doctors = await doctorModel
    .find({
      isActive: true,
    })
    .populate("userId", "firstName lastName");
  return (
    <div className="min-h-screen pt-21 bg-gray-100 dark:bg-zinc-800">
      <Doctors doctors={JSON.parse(JSON.stringify(doctors))} />
    </div>
  );
}

export default page;
