import connectionToDB from "@/utiles/DB/connection";
import workingDayModel from "@/model/workingDay";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectionToDB();
    const { id } = await params;

    const schedules = await workingDayModel.find({ doctorId: id }).lean();

    return NextResponse.json(schedules);
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریافت برنامه کاری" },
      { status: 500 }
    );
  }
}
