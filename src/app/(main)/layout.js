import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/navbar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import AOSInit from "@/utiles/AOS/initAos";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import userModel from "../../../model/user";
export default async function RootLayout({ children }) {
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
