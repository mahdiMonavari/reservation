import connectionToDB from "@/utiles/DB/connection";
import commentModel from "../../../../model/comment";
import serviceModel from "../../../../model/service";
import DoctorCard from "./DoctorCard";
import DoctorComment from "./DoctorComment";
import DoctorServices from "./DoctorServices";
async function DoctorPage({ doctor, commentCount, isUserLogin, params }) {
  await connectionToDB();
  const services = await serviceModel.find({ doctorId: doctor.userId._id });
  const comments = await commentModel
    .find({ doctorId: doctor.userId._id, parentId: null, isVerified: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("userId", "firstName lastName");
  const commentsId = comments.map((comment) => comment._id);
  const answerComments = await commentModel
    .find({
      parentId: { $in: commentsId },
    })
    .populate("userId", "firstName lastName");
  return (
    <div className="container my-20">
      <DoctorCard {...doctor} commentCount={commentCount} params={params} />
      <DoctorServices services={JSON.parse(JSON.stringify(services))} />
      <DoctorComment
        comments={JSON.parse(JSON.stringify(comments))}
        doctorId={doctor.userId._id}
        isUserLogin={isUserLogin}
        answerComments={JSON.parse(JSON.stringify(answerComments))}
      />
    </div>
  );
}

export default DoctorPage;
