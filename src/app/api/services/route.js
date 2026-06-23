import { cookies } from "next/headers";
import serviceModel from "../../../../model/service";
import connectionToDB from "@/utiles/DB/connection";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { ServiceValidator } from "../../../../validators/backend/serviceValidator";

export async function POST(req) {
  try {
    await connectionToDB();
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthenticated " }, { status: 401 });
    }
    const { role } = verifyAccessToken(token);
    if (role === "ADMIN" || role === "DOCTOR") {
      const { title, doctorId, price, duration, description, isPopular } =
        await req.json();
      const isValidData = ServiceValidator({
        title,
        doctorId,
        price,
        duration,
        description,
      });
      if (isValidData !== true) {
        return Response.json({ message: "bad request " }, { status: 400 });
      }

      const newService = await serviceModel.create({
        title,
        doctorId,
        price,
        duration,
        isPopular,
        description,
      });
      if (newService) {
        return Response.json(
          { message: "created service successfully", data: newService },
          { status: 201 }
        );
      }
    } else {
      return Response.json({ message: "Unauthenticated " }, { status: 401 });
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectionToDB();
    const services = await serviceModel.find();
    return Response.json({ message: "get successfully", data: services });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
