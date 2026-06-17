import CommentsPage from "@/components/templates/panelAdmin/comments/CommentsPage";
import commentModel from "../../../../../model/comment";

async function Comments() {
  const comments = await commentModel.find({}).populate("userId");

  return (
    <div>
      <CommentsPage comments={comments} />
    </div>
  );
}

export default Comments;
