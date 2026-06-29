import LoginCard from "@/components/templates/login/LoginCard";

export const metadata = {
  title: "ورود",
  description: "ورود به حساب کاربری کلینیک پزشکی",
  keywords: ["ورود", "حساب کاربری", "لاگین"],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "ورود | کلینیک پزشکی",
    description: "ورود به حساب کاربری کلینیک پزشکی",
    url: "https://your-domain.com/login",
  },
};

async function Login() {
  return <LoginCard />;
}

export default Login;
