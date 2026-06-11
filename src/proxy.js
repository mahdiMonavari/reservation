import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshTokenHandler } from "./utiles/auth/auth";

export async function proxy(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isRegisterPage = request.nextUrl.pathname === "/register";
  if ((isLoginPage || isRegisterPage) && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token) {
    const newAccessToken = await refreshTokenHandler(refreshToken);
    if (!newAccessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const response = NextResponse.next();
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/reservation", "/login", "/register"],
};
