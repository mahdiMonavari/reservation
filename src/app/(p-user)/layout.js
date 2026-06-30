import "@/styles/globals.css";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import userModel from "../../../model/user";
import connectionToDB from "@/utiles/DB/connection";
import Navbar from "@/components/templates/panelAdmin/navbar/Navbar";
import TopBar from "@/components/templates/panelAdmin/topbar/TopBar";

import { redirect } from "next/navigation";
import NavbarPUser from "@/components/templates/panelUser/layout/NavbarPUser";
import TopbarPUser from "@/components/templates/panelUser/layout/TopbarPUser";
import { AuthProvider } from "@/context/AuthContext";
import { MenuProvider } from "@/context/MenuMobile";
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
  if (!user) {
    redirect("/");
  }
  return (
    <html lang="fa" dir="rtl" className={theme === "dark" ? "dark" : ""}>
      <body className="transition-colors duration-300">
        <AuthProvider initailUser={user}>
          <MenuProvider>
            <div className="flex">
              <NavbarPUser />
              <div className="px-6 w-full bg-white/80 dark:bg-slate-900/90 text-slate-800 dark:text-white min-h-screen">
                <TopbarPUser theme={theme} />
                {children}
              </div>
            </div>
          </MenuProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
