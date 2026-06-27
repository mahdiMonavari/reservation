import { MdDashboard } from "react-icons/md";
import { FiCalendar, FiUser } from "react-icons/fi";

export const menuPUser = [
  {
    id: 1,
    title: "داشبورد",
    href: "/p-user",
    icon: MdDashboard,
  },
  {
    id: 2,
    title: "نوبت‌های من",
    href: "/p-user/appointments",
    icon: FiCalendar,
  },
  {
    id: 3,
    title: "پروفایل",
    href: "/p-user/profile",
    icon: FiUser,
  },
];
