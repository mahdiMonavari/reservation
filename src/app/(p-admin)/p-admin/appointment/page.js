import { cookies } from "next/headers";
import userModel from "../../../../../model/user";
import { verifyAccessToken } from "@/utiles/auth/auth";
import appointmentModel from "../../../../../model/appointment";
import serviceModel from "../../../../../model/service";
import doctorModel from "../../../../../model/doctor";
import AppointMentPage from "@/components/templates/panelAdmin/appointment/AppointMentPage";
import connectionToDB from "@/utiles/DB/connection";

async function Appointment({ searchParams }) {
  await connectionToDB();

  const params = await searchParams;
  const search = params?.search || "";
  const page = Number(params?.page) || 1;
  const inPage = 6;

  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne({ phoneNumber: phone }, "_id");

  let matchedUserIds = [];
  if (search) {
    const matchedUsers = await userModel.find(
      {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { phoneNumber: { $regex: search } },
        ],
      },
      "_id"
    );
    matchedUserIds = matchedUsers.map((u) => u._id);
  }

  const filter = {
    doctorId: user._id,
    ...(search && { userId: { $in: matchedUserIds } }),
  };

  const [appointments, totalCount] = await Promise.all([
    appointmentModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * inPage)
      .limit(inPage)
      .populate("userId", "firstName lastName phoneNumber")
      .populate("doctorId", "firstName lastName")
      .populate("serviceIds")
      .lean(),
    appointmentModel.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalCount / inPage);

  return (
    <AppointMentPage
      totalPages={totalPages}
      appointments={JSON.parse(JSON.stringify(appointments))}
      currentPage={page}
      search={search}
    />
  );
}

export default Appointment;
