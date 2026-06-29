import RegisterCard from "@/components/templates/register/RgisterCard";

export const metadata = {
  title: "ثبت نام",
  description: "ثبت نام در کلینیک پزشکی و رزرو آنلاین نوبت",
  keywords: ["ثبت نام", "عضویت", "حساب کاربری جدید"],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "ثبت نام | کلینیک پزشکی",
    description: "ثبت نام در کلینیک پزشکی و رزرو آنلاین نوبت",
    url: "https://your-domain.com/register",
  },
};
async function Register() {
  return <RegisterCard />;
}

export default Register;
