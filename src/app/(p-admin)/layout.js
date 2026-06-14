import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import AOSInit from "@/utiles/AOS/initAos";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import userModel from "../../../model/user";
import connectionToDB from "@/utiles/DB/connection";
import Navbar from "@/components/templates/panelAdmin/navbar/Navbar";
import TopBar from "@/components/templates/panelAdmin/topbar/TopBar";
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
      <body className="transition-colors duration-300">
        <AuthProvider initailUser={user}>
          <div className="flex">
            <Navbar />
            <div className="w-full">
              <TopBar />
              <div className="bg-gray-200 dark:bg-zinc-800 min-h-screen">
                {children}
              </div>
            </div>
          </div>
          <AOSInit />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
