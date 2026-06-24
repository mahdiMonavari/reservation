import { cookies } from "next/headers";
import doctorModel from "../../../../../model/doctor";
import userModel from "../../../../../model/user";
import DoctorsPage from "@/components/templates/panelAdmin/doctors/DoctorPage";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { redirect } from "next/navigation";

async function Page({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const limit = 10;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { role } = verifyAccessToken(token);
  if (role !== "ADMIN") {
    return redirect("/p-admin");
  }
  const query =
    search.length > 0
      ? {
          $and: [
            {
              $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } },
              ],
            },
            {
              $or: [{ role: "DOCTOR" }, { role: "ADMIN" }],
            },
          ],
        }
      : { $or: [{ role: "DOCTOR" }, { role: "ADMIN" }] };
  const matchedUsers = await userModel.find(query, "_id");
  const arrayIds = matchedUsers.map((item) => item._id);

  const [doctorsAllData, total] = await Promise.all([
    doctorModel
      .find({ userId: { $in: arrayIds } })
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    doctorModel.countDocuments({ userId: { $in: arrayIds } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <DoctorsPage
      total={total}
      initialDoctors={JSON.parse(JSON.stringify(doctorsAllData))}
      totalPages={totalPages}
      currentPage={page}
      search={search}
    />
  );
}

export default Page;
