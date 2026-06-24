import commentModel from "../../../../model/comment";
import { createCommentValidator } from "../../../../validators/backend/commentValidator";

export async function POST(req) {
  try {
    const commentBody = await req.json();
    const { doctorId, text, userId } = commentBody;
    const isValidData = createCommentValidator({
      doctorId,
      userId,
      text,
    });
    if (isValidData !== true) {
      return Response.json({ message: "bad request " }, { status: 400 });
    }
    await commentModel.create({ ...commentBody });
    return Response.json({ message: "comment created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
