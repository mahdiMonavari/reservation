"use client";
import { useState, useEffect, useRef } from "react";
import { FiPhone, FiLock, FiEdit2 } from "react-icons/fi";
import clsx from "clsx";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import { errorToast } from "@/components/modules/toast/toast";

const RESEND_SECONDS = 90;

const inputBase = `w-full rounded-xl py-3 pr-10 pl-4 text-base
  bg-emerald-50 dark:bg-white/5
  border border-emerald-200 dark:border-white/10
  text-emerald-900 dark:text-white
  placeholder:text-emerald-950/60 dark:placeholder:text-white/25
  focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-400/60
  focus:bg-white dark:focus:bg-white/10
  transition-all duration-200 text-right`;

function VerifyNumber({ phoneNumber, setPhoneNumber, setIsPhoneVerified }) {
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const timerRef = useRef(null);

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
    if (phoneNumber.length < 11) {
      return errorToast("شماره تلفن صحیح نمیباشد");
    }
    if (!phoneNumber.startsWith("09")) {
      return errorToast("فرمت شماره تلفن صحیح نمیباشد");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      if (res.status === 200) {
        setCodeSent(true);
        startTimer();
      } else {
        errorToast("خطا در ارسال کد، دوباره تلاش کنید");
      }
    } catch (err) {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setCodeSent(false);
    setOtp("");
    clearInterval(timerRef.current);
  };

  const handleVrifyUserEnterCode = async () => {
    if (otp.length < 5) {
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });
      if (res.status === 200) {
        setIsPhoneVerified(true);
      } else if (res.status === 400) {
        errorToast("کد معتبر نمی‌باشد");
      } else {
        errorToast("کد منقضی شده است");
      }
    } catch (err) {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setOtp("");
    handleSend();
  };

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="space-y-4">
        <div className="relative">
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2
          text-emerald-400 dark:text-emerald-400/60 pointer-events-none"
          >
            <FiPhone size={17} />
          </span>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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

        <div
          className={clsx(
            "transition-all duration-400 overflow-hidden",
            codeSent ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          )}
        >
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
        </div>

        {codeSent && (
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

        <button
          type="button"
          onClick={() => (codeSent ? handleVrifyUserEnterCode() : handleSend())}
          className="relative w-full py-3 rounded-xl font-Morabba-Bold text-base
          bg-emerald-500 hover:bg-emerald-600 text-white overflow-hidden
          transition-all duration-200
          hover:shadow-md hover:shadow-emerald-500/20
          active:scale-[0.98] group"
        >
          <span className="relative z-10">
            {codeSent ? "تأیید شماره" : "ارسال کد"}
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

export default VerifyNumber;
