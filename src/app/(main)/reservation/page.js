import Reservation from "@/components/templates/resarvation/Reservation";
import doctorModel from "../../../../model/doctor";

async function page() {
  const doctors = await doctorModel.find({ isActive: true }).populate("userId");
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-700">
      <Reservation doctors={JSON.parse(JSON.stringify(doctors))} />
    </div>
  );
}

export default page;
