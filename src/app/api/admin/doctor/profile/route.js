import connectionToDB from "@/utiles/DB/connection";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import userModel from "../../../../../../model/user";
import Validator from "fastest-validator";
import doctorModel from "../../../../../../model/doctor";

const v = new Validator();
const schema = {
  specialty: { type: "string", empty: false },
  about: { type: "string", empty: false },
  fieldOfStudy: { type: "string", empty: false },
  experience: { type: "number", positive: true },
  avgAppointmentTime: { type: "number", positive: true },
  baseFee: { type: "number", positive: true },
  $$strict: false,
};
const check = v.compile(schema);

async function handlePhotoUpload(photoFile, userId) {
  if (!photoFile || photoFile.size === 0) return undefined;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const bytes = await photoFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `doctor-${userId}-${Date.now()}${path.extname(photoFile.name)}`;

  await writeFile(path.join(uploadsDir, filename), buffer);

  return `/uploads/${filename}`;
}

export async function PUT(req) {
  try {
    await connectionToDB();

    const cookieStore = await cookies();
    const { phone, role } = verifyAccessToken(cookieStore.get("token")?.value);
    if (role === "USER") {
      return Response.json({ message: "not Unauthorized" }, { status: 401 });
    }
    const user = await userModel.findOne({ phoneNumber: phone }, "_id");

    if (!user) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const fields = {
      specialty: formData.get("specialty") || "",
      about: formData.get("about") || "",
      fieldOfStudy: formData.get("fieldOfStudy") || "",
      experience: Number(formData.get("experience")) || 0,
      avgAppointmentTime: Number(formData.get("avgAppointmentTime")) || 0,
      baseFee: Number(formData.get("baseFee")) || 0,
    };

    const photoPath = await handlePhotoUpload(formData.get("photo"), user._id);

    const validationResult = check(fields);
    const allValid = validationResult === true;
    const existingDoctor = await doctorModel.findOne(
      { userId: user._id },
      "photo",
    );
    const hasPhoto = photoPath || !!existingDoctor?.photo;

    const updatePayload = {
      ...fields,
      ...(photoPath && { photo: photoPath }),
      ...(allValid && hasPhoto && { isActive: true }),
    };

    const updated = await doctorModel
      .findOneAndUpdate({ userId: user._id }, updatePayload, { new: true })
      .populate("userId");

    return Response.json({ data: updated }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "internal error" }, { status: 500 });
  }
}
