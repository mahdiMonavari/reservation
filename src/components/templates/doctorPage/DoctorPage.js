import commentModel from "../../../../model/comment";
import serviceModel from "../../../../model/service";
import DoctorCard from "./DoctorCard";
import DoctorComment from "./DoctorComment";
import DoctorServices from "./DoctorServices";
async function DoctorPage({ doctor, commentCount, isUserLogin }) {
  const services = await serviceModel.find({ doctorId: doctor.userId._id });
  const comments = await commentModel
    .find({ doctorId: doctor.userId._id, parentId: null, isVerified: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("userId", "firstName lastName");
  return (
    <div className="container my-20">
      <DoctorCard {...doctor} commentCount={commentCount} />
      <DoctorServices services={JSON.parse(JSON.stringify(services))} />
      <DoctorComment
        comments={JSON.parse(JSON.stringify(comments))}
        doctorId={doctor.userId._id}
        isUserLogin={isUserLogin}
      />
    </div>
  );
}

export default DoctorPage;
