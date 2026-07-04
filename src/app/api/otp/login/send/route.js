import connectionToDB from "@/utiles/DB/connection";
import userModel from "../../../../../../model/user";

export async function POST(req) {
  try {
    await connectionToDB();
    const { phone } = await req.json();
    if (!phone) {
      return Response.json({ message: "phone is required" }, { status: 400 });
    }
    if (phone.length < 11 || !phone.startsWith("09")) {
      return Response.json({ message: "invalid entry" }, { status: 422 });
    }
    const user = await userModel.findOne({ phoneNumber: phone });
    if (!user) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }
    const res = await fetch("http://localhost:3000/api/otp/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });
    if (res.status === 200) {
      return Response.json({ message: "code sent" }, { status: 200 });
    } else if (res.status === 409) {
      return Response.json(
        { message: "لطفاً کمی صبر کنید، کد قبلی هنوز معتبر است" },
        { status: 409 },
      );
    } else if (res.status === 429) {
      return Response.json({ message: "limited per day" }, { status: 429 });
    } else if (res.status === 500) {
      return Response.json(
        { message: "please try again later" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
