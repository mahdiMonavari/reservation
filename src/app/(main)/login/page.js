import LoginForm from "@/components/templates/login/LoginForm";
import Link from "next/link";
import { IoIosLogIn } from "react-icons/io";

function Login() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center
      bg-gray-100 p-4 overflow-hidden dark:bg-zinc-800"
    >
      {/* rings — فقط dark */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full
        border border-emerald-900/10 dark:border-emerald-500/10
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        className="pointer-events-none absolute w-[350px] h-[350px] rounded-full
        border border-emerald-900/10 dark:border-emerald-400/10
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative w-full max-w-sm">
        {/* card */}
        <div
          className="relative bg-white/80 dark:bg-white/5
          backdrop-blur-xl rounded-3xl
          border border-emerald-200/80 dark:border-white/10
          shadow-xl shadow-emerald-900/10 dark:shadow-emerald-950/50 overflow-hidden"
        >
          {/* top accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

          <div className="px-8 pt-8 pb-10">
            {/* logo */}
            <div className="flex justify-center mb-5">
              <div
                className="w-12 h-12 rounded-2xl
                bg-emerald-100 dark:bg-emerald-500/20
                border border-emerald-300/60 dark:border-emerald-400/30
                flex items-center justify-center
                text-emerald-600 dark:text-emerald-300 text-xl"
              >
                ✦
              </div>
            </div>

            <h1
              className="text-xl font-Morabba-Bold text-center
              text-emerald-900 dark:text-white mb-1"
            >
              خوش آمدید
            </h1>
            <p
              className="text-center text-sm
              text-emerald-600/70 dark:text-emerald-300/60 mb-7"
            >
              وارد حساب کاربری خود شوید
            </p>

            <LoginForm />

            <div className="mt-5 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-sm
                  text-emerald-600/60 dark:text-emerald-300/50
                  hover:text-emerald-700 dark:hover:text-emerald-300
                  transition-colors duration-200 group"
              >
                <IoIosLogIn className="group-hover:scale-110 transition-transform" />
                حساب ندارید؟ ثبت نام کنید
              </Link>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default Login;
