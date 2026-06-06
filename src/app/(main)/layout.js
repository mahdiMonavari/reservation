import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/navbar";
import "@/styles/globals.css"
import AOSInit from "@/utiles/AOS/initAos";
import { cookies } from "next/headers";
export default async function RootLayout({ children }) {
  const cookiesStore = await cookies()
  const theme = cookiesStore.get("theme")?.value
  return (
    <html
      lang="fa" dir="rtl"
      className={theme==="dark"?"dark":""}
    >
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <Navbar theme={theme}/>
        {children}
        <div className="dark:bg-teal-900 bg-emerald-400">
            <Footer/>
        </div>
        <AOSInit/>
        </body>
    </html>
  );
}