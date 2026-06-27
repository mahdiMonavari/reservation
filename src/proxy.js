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
  // console.log("step 1", payload);
  if (Boolean(payload) !== false) {
    // console.log("step 2", pathname);
    if (pathname.includes("login") || pathname.includes("register")) {
      // console.log("step 3 redirect reservation");
      return NextResponse.redirect(new URL("/reservation", request.url));
    }
    if (
      payload.role !== "ADMIN" &&
      payload.role !== "DOCTOR" &&
      pathname.startsWith("/p-admin")
    ) {
      // console.log("step 4 redirect login page");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname.startsWith("/p-admin/users") && payload.role === "DOCTOR") {
      // console.log("step 5 redirect p-admin");
      return NextResponse.redirect(new URL("/p-admin", request.url));
    }
    return NextResponse.next();
  } else {
    const newAccessToken = await refreshTokenHandler(refreshToken);
    // console.log("step 6", newAccessToken);
    if (!newAccessToken) {
      // console.log("step 7 invalid access token");
      if (isProtectedRoute || pathname.startsWith("/p-admin")) {
        // console.log("step 8 redirect login");
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    } else {
      if (!pathname.startsWith("/p-admin")) {
        // console.log("step 9 valid access token");
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
        // console.log("step 10 invalid access token", payload);
        if (payload.role !== "ADMIN" && payload.role !== "DOCTOR") {
          // console.log("step 11 redirect login page");
          return NextResponse.redirect(new URL("/login", request.url));
        }
        if (
          (pathname.startsWith("/p-admin/comments") ||
            pathname.startsWith("/p-admin/users")) &&
          payload.role === "DOCTOR"
        ) {
          // console.log("step 12 redirect p-admin");
          return NextResponse.redirect(new URL("/p-admin", request.url));
        }
        // console.log("step 12 next url");
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
