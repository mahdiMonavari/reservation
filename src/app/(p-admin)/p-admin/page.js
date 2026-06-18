import DashboardPage from "@/components/templates/panelAdmin/dashboard/DashboardPage";
import userModel from "../../../../model/user";
import commentModel from "../../../../model/comment";
import appointmentModel from "../../../../model/appointment";
import connectionToDB from "@/utiles/DB/connection";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";
import serviceModel from "../../../../model/service";

async function getAdminStats() {
  const [
    usersCount,
    doctorsCount,
    reservationsCount,
    commentsCount,
    pendingComments,
  ] = await Promise.all([
    userModel.countDocuments({ role: "USER" }),
    userModel.countDocuments({ $or: [{ role: "DOCTOR" }, { role: "ADMIN" }] }),
    appointmentModel.countDocuments(),
    commentModel.countDocuments({ parentId: null }),
    commentModel.countDocuments({ parentId: null, isVerified: false }),
  ]);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newUsersThisWeek = await userModel.countDocuments({
    createdAt: { $gte: oneWeekAgo },
  });

  return {
    usersCount,
    doctorsCount,
    reservationsCount,
    commentsCount,
    pendingComments,
    newUsersThisWeek,
  };
}

async function getDoctorStats(doctorId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [totalReservations, todayReservations, monthlyReservations] =
    await Promise.all([
      appointmentModel.countDocuments({ doctorId }),
      appointmentModel.find({ doctorId, date: { $gte: today, $lt: tomorrow } }),
      appointmentModel
        .find({ doctorId, createdAt: { $gte: startOfMonth } })
        .populate("serviceIds"),
    ]);

  const remaining = todayReservations.filter((r) => !r.isVisited).length;

  const monthlyIncome = monthlyReservations.reduce((sum, r) => {
    const total = (r.services || []).reduce((s, sv) => s + (sv.price || 0), 0);
    return sum + total;
  }, 0);

  return {
    totalReservations,
    todayReservations: todayReservations.length,
    remaining,
    monthlyIncome: monthlyIncome.toLocaleString("fa-IR"),
    rating: "5",
  };
}

export default async function Dashboard() {
  await connectionToDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne({ phoneNumber: phone }).lean();

  const isAdmin = user.role === "ADMIN";

  const [adminStats, doctorStats, recentUsers] = await Promise.all([
    isAdmin ? getAdminStats() : null,
    getDoctorStats(user._id),
    isAdmin ? userModel.find().sort({ createdAt: -1 }).limit(5).lean() : null,
  ]);

  const serialized = JSON.parse(
    JSON.stringify({ adminStats, doctorStats, recentUsers })
  );

  return (
    <DashboardPage
      adminStats={serialized.adminStats}
      doctorStats={serialized.doctorStats}
      recentUsers={serialized.recentUsers}
      userRole={user.role}
    />
  );
}
