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
import { MenuProvider } from "@/context/MenuMobile";
import { redirect } from "next/navigation";
export default async function RootLayout({ children }) {
  await connectionToDB();
  const cookiesStore = await cookies();
  const theme = cookiesStore.get("theme")?.value;
  const userToken = cookiesStore.get("token")?.value;
  const userTokenVerify = verifyAccessToken(userToken) || null;
  const user = JSON.parse(
    JSON.stringify(
      await userModel.findOne({ phoneNumber: userTokenVerify?.phone })
    )
  );
  if (user.role === "USER") {
    redirect("/");
  }
  const admin = verifyAccessToken(userToken);
  return (
    <html lang="fa" dir="rtl" className={theme === "dark" ? "dark" : ""}>
      <body className="transition-colors duration-300">
        <AuthProvider initailUser={user}>
          <MenuProvider>
            <div className="flex">
              <Navbar />
              <div className="w-full">
                <TopBar theme={theme} admin={admin} />
                <div className="bg-gray-200 relative dark:bg-slate-950 min-h-screen">
                  {children}
                </div>
              </div>
            </div>
          </MenuProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
