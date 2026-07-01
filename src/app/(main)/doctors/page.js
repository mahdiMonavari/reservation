import Doctors from "@/components/templates/doctors/Doctors";
import React from "react";
import doctorModel from "../../../../model/doctor";

export const metadata = {
  title: "دکترها",
  description: "لیست پزشکان و متخصصان کلینیک پزشکی",
  keywords: ["دکتر", "متخصص", "پزشک", "لیست پزشکان", "کلینیک"],
  openGraph: {
    title: "دکترها | کلینیک پزشکی",
    description: "لیست پزشکان و متخصصان کلینیک پزشکی",
    url: "https://your-domain.com/doctors",
  },
};

async function page() {
  const doctors = await doctorModel
    .find({
      isActive: true,
    })
    .populate("userId", "firstName lastName");
  return (
    <div className="min-h-screen pt-21 bg-gray-100 dark:bg-slate-950">
      <Doctors doctors={JSON.parse(JSON.stringify(doctors))} />
    </div>
  );
}

export default page;
