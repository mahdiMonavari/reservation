import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshTokenHandler, verifyAccessToken } from "./utiles/auth/auth";

const publicRoutes = ["/login", "/register"];

export async function proxy(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // توکن داره، رد بشه
  if (token) {
    const isValidToken = verifyAccessToken(token);
    if (isValidToken) {
      return NextResponse.next();
    }
  }

  // توکن نداره، رفرش توکن چک کن
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

export const config = {
  matcher: "/:path*",
};
