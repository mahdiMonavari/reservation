import Reservation from "@/components/templates/resarvation/Reservation";
import doctorModel from "../../../../model/doctor";

export const metadata = {
  title: "رزرو نوبت",
  description: "رزرو آنلاین نوبت پزشکی در کلینیک",
  keywords: ["رزرو نوبت", "نوبت آنلاین", "ویزیت آنلاین"],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "رزرو نوبت | کلینیک پزشکی",
    description: "رزرو آنلاین نوبت پزشکی در کلینیک",
    url: "https://your-domain.com/reservation",
  },
};

async function page() {
  const doctors = await doctorModel.find({ isActive: true }).populate("userId");
  return (
    <div className="bg-gray-100 dark:bg-slate-950 min-h-screen pt-24">
      <Reservation doctors={JSON.parse(JSON.stringify(doctors))} />
    </div>
  );
}

export default page;
