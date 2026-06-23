import DoctorPage from "@/components/templates/doctorPage/DoctorPage";
import doctorModel from "../../../../../model/doctor";
import commentModel from "../../../../../model/comment";

async function page({ params }) {
  const { id } = await params;
  const doctor = await doctorModel
    .findOne({ userId: id })
    .populate("userId", "firstName lastName");
  const commentCount = await commentModel.countDocuments({ parentId: null });
  return (
    <div className="min-h-screen pt-21 bg-gray-100 dark:bg-zinc-800">
      <DoctorPage
        doctor={JSON.parse(JSON.stringify(doctor))}
        commentCount={commentCount}
      />
    </div>
  );
}

export default page;
