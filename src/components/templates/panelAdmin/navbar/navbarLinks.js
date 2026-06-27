import {
  FaUsers,
  FaComments,
  FaCalendarAlt,
  FaConciergeBell,
  FaCalendarCheck,
  FaTachometerAlt,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const menu = [
  { label: "داشبورد", href: "/p-admin", icon: <FaTachometerAlt /> },
  { label: "کاربران", href: "/p-admin/users", icon: <FaUsers /> },
  { label: "دکترها", href: "/p-admin/doctors", icon: <FaUserDoctor /> },
  {
    label: "کامنت‌ها",
    href: "/p-admin/comments",
    icon: <FaComments />,
  },
  {
    label: "نوبت‌ها",
    href: "/p-admin/appointment",
    icon: <FaCalendarAlt />,
  },
  {
    label: "خدمات",
    href: "/p-admin/services",
    icon: <FaConciergeBell />,
  },
  {
    label: "روزهای حضور",
    href: "/p-admin/schedule",
    icon: <FaCalendarCheck />,
  },
];
export default menu;
