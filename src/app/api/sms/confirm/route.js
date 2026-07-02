import { cookies } from "next/headers";
import smsReserveValidator from "../../../../../validators/backend/smsReserveValidator";
import { verifyAccessToken } from "@/utiles/auth/auth";

export async function POST(req) {
  const API_KEY = process.env.API_KEY;
  const PATTERN_CONFIRM = process.env.PATTERN_CONFIRM;
  const FROM_NUMBER = process.env.FROM_NUMBER;

  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 },
      );
    }

    const { phone } = verifyAccessToken(token);
    if (!phone) {
      return Response.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { dateShamsi, timeStart } = body;

    const isValid = smsReserveValidator({ dateShamsi, timeStart });

    if (isValid !== true) {
      return Response.json(
        { message: "Invalid date or time provided" },
        { status: 400 },
      );
    }

    const requestBody = {
      code: PATTERN_CONFIRM,
      attributes: {
        date: dateShamsi,
        hour: timeStart,
      },
      recipient: phone,
      line_number: FROM_NUMBER,
      number_format: "english",
    };

    try {
      const res = await fetch("https://api.iranpayamak.com/ws/v1/sms/pattern", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": API_KEY,
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (res.ok) {
        return Response.json(
          { message: "Code sent successfully" },
          { status: 200 },
        );
      } else {
        return Response.json(
          { message: data.message || "Failed to send SMS" },
          { status: res.status },
        );
      }
    } catch (fetchErr) {
      console.error("SMS API Network Error:", fetchErr);
      return Response.json(
        { message: "Service unavailable, please try again later" },
        { status: 503 },
      );
    }
  } catch (err) {
    console.error("Internal Server Error:", err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
