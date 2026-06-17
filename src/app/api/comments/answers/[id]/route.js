import commentModel from "../../../../../../model/comment";
import connectionToDB from "@/utiles/DB/connection";

export async function GET(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;

    if (!id || id.length !== 24) {
      return Response.json({ message: "bad request" }, { status: 400 });
    }

    const answers = await commentModel.find({ parentId: id });

    return Response.json({ message: "successfully", data: answers });
  } catch {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
