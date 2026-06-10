import connectionToDB from "@/utiles/DB/connection";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    await connectionToDB();
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("token")?.value;
    console.log(accessToken);
    return Response.json(true);
    // if (!accessToken) {
    //   return Response.json({ message: "Unauthorized" }, { status: 401 });
    // }
    // const payload = verifyAccessToken(accessToken);
    // return Response.json(payload);
  } catch (err) {
    console.log(err);
    return Response.json("internal error", { status: 500 });
  }
}
