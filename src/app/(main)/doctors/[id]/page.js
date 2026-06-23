import DoctorPage from "@/components/templates/doctorPage/DoctorPage";
import doctorModel from "../../../../../model/doctor";
import commentModel from "../../../../../model/comment";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";
import userModel from "../../../../../model/user";

async function page({ params }) {
  const { id } = await params;
  const doctor = await doctorModel
    .findOne({ userId: id })
    .populate("userId", "firstName lastName");
  const commentCount = await commentModel.countDocuments({
    parentId: null,
    isVerified: true,
  });
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne({ phoneNumber: phone }, "_id");
  return (
    <div className="min-h-screen pt-21 bg-gray-100 dark:bg-zinc-800">
      <DoctorPage
        doctor={JSON.parse(JSON.stringify(doctor))}
        commentCount={commentCount}
        isUserLogin={JSON.parse(JSON.stringify(user))}
      />
    </div>
  );
}

export default page;
