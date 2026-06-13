import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");
    return Response.json({ message: "logout successfully" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
