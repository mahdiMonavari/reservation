import CommentsPage from "@/components/templates/panelAdmin/comments/CommentsPage";
import commentModel from "../../../../../model/comment";
import connectionToDB from "@/utiles/DB/connection";

async function Comments({ searchParams }) {
  await connectionToDB();
  const params = await searchParams;
  const search = params?.search || "";
  const page = Number(params?.page) || 1;
  const limited = 10;
  const [comments, commentsCount] = await Promise.all([
    commentModel
      .find({ parentId: null, text: { $regex: search, $options: "i" } }, {})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limited)
      .limit(limited)
      .populate("userId", "firstName lastName")
      .populate("doctorId", "firstName lastName")
      .populate("parentId", "text")
      .lean(),
    commentModel.countDocuments({
      parentId: null,
      text: { $regex: search, $options: "i" },
    }),
  ]);
  const totalPage = Math.ceil(commentsCount / limited);
  return (
    <CommentsPage
      commentsList={JSON.parse(JSON.stringify(comments))}
      totalPage={totalPage}
      commentsCount={commentsCount}
      currentPage={page}
    />
  );
}

export default Comments;
