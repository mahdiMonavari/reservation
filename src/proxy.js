import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshTokenHandler, verifyAccessToken } from "./utiles/auth/auth";

const protectedRoute = ["/reservation"];

export async function proxy(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoute.includes(pathname);
  const payload = verifyAccessToken(token);
  if (Boolean(payload) !== false) {
    if (pathname.includes("login") || pathname.includes("register")) {
      return NextResponse.redirect(new URL("/reservation", request.url));
    }
    if (
      payload.role !== "ADMIN" &&
      payload.role !== "DOCTOR" &&
      pathname.startsWith("/p-admin")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname.startsWith("/p-admin/users") && payload.role === "DOCTOR") {
      return NextResponse.redirect(new URL("/p-admin", request.url));
    }
    return NextResponse.next();
  } else {
    const newAccessToken = await refreshTokenHandler(refreshToken);
    console.log(newAccessToken);
    if (!newAccessToken) {
      if (isProtectedRoute || pathname.startsWith("/p-admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    } else {
      if (!pathname.startsWith("/p-admin")) {
        const response = NextResponse.next();
        response.cookies.set("token", newAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
          maxAge: 15 * 60,
        });
        return response;
      } else {
        const payload = verifyAccessToken(newAccessToken);
        if (payload.role !== "ADMIN" && payload.role !== "DOCTOR") {
          return NextResponse.redirect(new URL("/login", request.url));
        }
        if (
          (pathname.startsWith("/p-admin/comments") ||
            pathname.startsWith("/p-admin/users")) &&
          payload.role === "DOCTOR"
        ) {
          return NextResponse.redirect(new URL("/p-admin", request.url));
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
    }
  }
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.woff|.*\\.woff2|api/).*)",
  ],
};
