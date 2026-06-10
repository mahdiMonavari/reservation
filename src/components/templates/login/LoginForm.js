"use client";
import clsx from "clsx";
import { FiPhone, FiLock } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { errorToast } from "@/components/modules/toast/toast";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";

const RESEND_SECONDS = 90;

const inputBase = `w-full rounded-xl py-3 pr-10 pl-4 text-base
  bg-emerald-50 dark:bg-white/5
  border border-emerald-200 dark:border-white/10
  text-emerald-900 dark:text-white
  placeholder:text-emerald-400/60 dark:placeholder:text-white/25
  focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-400/60
  focus:bg-white dark:focus:bg-white/10
  transition-all duration-200 text-right`;

function LoginForm() {
  const [loginWithPass, setLoginWithPass] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const timerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const startTimer = () => {
    setCountdown(RESEND_SECONDS);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((p) => {
        if (p <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const handleSend = async () => {
    if (phone.length < 11) {
      return errorToast("شماره تلفن صحیح نمیباشد");
    }
    if (!phone.startsWith("09")) {
      return errorToast("فرمت شماره تلفن صحیح نمیباشد");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/login/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      if (res.status === 200) {
        setCodeSent(true);
        startTimer();
      } else if (res.status === 422) {
        errorToast("شماره تلفن معتبر نمیباشد");
      } else if (res.status === 404) {
        errorToast("کاربری با این شماره یافت نشد");
      }
    } catch (err) {
      errorToast("خطایی رخ داد، دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setCodeSent(false);
    setOtp("");
    clearInterval(timerRef.current);
  };

  const handleResend = () => {
    setOtp("");
    startTimer();
  };

  const loginWithPassHanler = () => {};
  const verifyUser = async () => {
    if (otp < 5) {
      return errorToast("کد وارد شده صحیح نمیباشد");
    }
    setLoading(true);
    try {
      const res = await fetch("api/auth/login/sms", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
      });
      if (res.status === 200) {
      } else if (res.status === 400) {
        errorToast("رمز وارد شده صحیح نمیباشد");
      } else if (res.status === 409) {
        errorToast("کد منقضی است");
      }
    } catch (err) {
      return errorToast("ورود با خطا مواجه شد دوباره امتحان کنید");
    } finally {
      setLoading(false);
    }
  };
  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="space-y-4">
        {/* toggle — فقط وقتی کد ارسال نشده */}
        {!codeSent && (
          <div
            className="flex rounded-xl bg-emerald-50 dark:bg-white/5
          border border-emerald-200 dark:border-white/10 p-1 gap-1"
          >
            {[
              { label: "ورود با پیامک", val: false },
              { label: "رمز عبور", val: true },
            ].map(({ label, val }) => (
              <button
                key={label}
                type="button"
                onClick={() => setLoginWithPass(val)}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-sm font-Morabba-Bold transition-all duration-250",
                  loginWithPass === val
                    ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                    : "text-emerald-500/60 dark:text-white/40 hover:text-emerald-600 dark:hover:text-white/60"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* شماره تلفن */}
        <div className="relative">
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2
          text-emerald-400 dark:text-emerald-400/60 pointer-events-none"
          >
            <FiPhone size={17} />
          </span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={codeSent}
            type="text"
            inputMode="numeric"
            maxLength={11}
            placeholder="شماره تماس"
            className={clsx(
              inputBase,
              codeSent && "opacity-60 cursor-not-allowed"
            )}
            dir="rtl"
          />
          {/* دکمه ویرایش وقتی کد ارسال شده */}
          {codeSent && (
            <button
              type="button"
              onClick={handleEdit}
              className="absolute left-3 top-1/2 -translate-y-1/2
              flex items-center gap-1 text-xs font-Morabba-Bold
              text-emerald-600 dark:text-emerald-400
              bg-emerald-100 dark:bg-emerald-500/20
              px-2 py-1 rounded-lg
              hover:bg-emerald-200 dark:hover:bg-emerald-500/30
              transition-colors duration-150"
            >
              <FiEdit2 size={11} />
              ویرایش
            </button>
          )}
        </div>

        {/* رمز عبور — فقط حالت پسورد و قبل از ارسال کد */}
        {loginWithPass && !codeSent && (
          <div className="relative">
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2
            text-emerald-400 dark:text-emerald-400/60 pointer-events-none"
            >
              <FiLock size={17} />
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="رمز عبور"
              className={inputBase}
              dir="rtl"
            />
          </div>
        )}

        {/* OTP input */}
        {codeSent && !loginWithPass && (
          <div className="relative">
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2
            text-emerald-400 dark:text-emerald-400/60 pointer-events-none"
            >
              <FiLock size={17} />
            </span>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="کد دریافتی"
              className={inputBase}
              dir="ltr"
            />
          </div>
        )}

        {/* تایمر */}
        {codeSent && !loginWithPass && (
          <div className="text-center text-sm">
            {countdown > 0 ? (
              <span className="text-emerald-500/60 dark:text-emerald-300/50">
                ارسال مجدد تا{" "}
                <span className="text-emerald-600 dark:text-emerald-300 font-Morabba-Bold tabular-nums">
                  {fmt(countdown)}
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-emerald-600 dark:text-emerald-400
                hover:text-emerald-700 dark:hover:text-emerald-300
                underline underline-offset-2 transition-colors"
              >
                ارسال مجدد کد
              </button>
            )}
          </div>
        )}

        {/* دکمه اصلی */}
        <button
          type="button"
          onClick={
            loginWithPass
              ? loginWithPassHanler
              : !codeSent
                ? handleSend
                : verifyUser
          }
          className="relative w-full py-3 rounded-xl font-Morabba-Bold text-base
          bg-emerald-500 hover:bg-emerald-600
          text-white overflow-hidden
          transition-all duration-200
          hover:shadow-md hover:shadow-emerald-500/20
          active:scale-[0.98] group"
        >
          <span className="relative z-10">
            {!loginWithPass ? (codeSent ? "تأیید و ورود" : "ادامه") : ""}
            {loginWithPass && "تایید و ورود"}
          </span>
          <span
            className="absolute inset-0 bg-gradient-to-l
          from-white/0 via-white/10 to-white/0
          translate-x-full group-hover:translate-x-[-200%]
          transition-transform duration-700"
          />
        </button>
      </div>
    </>
  );
}

export default LoginForm;
