import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/navbar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import AOSInit from "@/utiles/AOS/initAos";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import userModel from "../../../model/user";
import connectionToDB from "@/utiles/DB/connection";

export const metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "کلینیک پزشکی",
    template: "%s | کلینیک پزشکی",
  },
  description: "رزرو آنلاین نوبت پزشکی با بهترین متخصصان",
  keywords: ["کلینیک", "رزرو نوبت", "پزشک", "متخصص", "نوبت آنلاین"],
  authors: [{ name: "کلینیک پزشکی" }],
  creator: "کلینیک پزشکی",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "کلینیک پزشکی",
  },
};

export default async function RootLayout({ children }) {
  connectionToDB();
  const cookiesStore = await cookies();
  const theme = cookiesStore.get("theme")?.value;
  const userToken = cookiesStore.get("token")?.value;
  const userTokenVerify = verifyAccessToken(userToken) || null;
  const user = JSON.parse(
    JSON.stringify(
      await userModel.findOne({ phoneNumber: userTokenVerify?.phone })
    )
  );
  return (
    <html lang="fa" dir="rtl" className={theme === "dark" ? "dark" : ""}>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <AuthProvider initailUser={user}>
          <Navbar theme={theme} />
          {children}
          <div className="dark:bg-teal-900 bg-emerald-400">
            <Footer />
          </div>
          <AOSInit />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
