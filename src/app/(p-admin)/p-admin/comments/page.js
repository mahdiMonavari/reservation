import CommentsPage from "@/components/templates/panelAdmin/comments/CommentsPage";
import commentModel from "../../../../../model/comment";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";
import userModel from "../../../../../model/user";

async function Comments() {
  const comments = await commentModel
    .find({ parentId: null })
    .populate("userId", "firstName lastName")
    .populate("doctorId", "firstName lastName")
    .populate("parentId", "text")
    .lean();
  const serialized = JSON.parse(JSON.stringify(comments));
  return <CommentsPage comments={serialized} />;
}

export default Comments;
