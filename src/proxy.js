import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshTokenHandler } from "./utiles/auth/auth";

export async function proxy(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const newAccessToken = await refreshTokenHandler(refreshToken);
    if (!newAccessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    cookieStore.set("token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/reservation"],
};
