import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshTokenHandler, verifyAccessToken } from "./utiles/auth/auth";

const publicRoutes = ["/login", "/register", "/", "/about", "/contact-us"];

export async function proxy(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);
  const payload = verifyAccessToken(token);
  if (Boolean(payload) !== false) {
    if (pathname.includes("login") || pathname.includes("register")) {
      return NextResponse.redirect(new URL("/reservation", request.url));
    }
    return NextResponse.next();
  } else {
  }
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.woff|.*\\.woff2|api/).*)",
  ],
};
