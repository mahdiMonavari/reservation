// model/comment.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 500,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const commentModel =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default commentModel;
