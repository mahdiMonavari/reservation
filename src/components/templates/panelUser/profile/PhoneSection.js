"use client";
import { useEffect, useRef, useState } from "react";
import { FiPhone, FiEdit2, FiX } from "react-icons/fi";
import { successToast, errorToast } from "@/components/modules/toast/toast";
import { toEnglishDigits } from "@/utiles/auth/convertNumber";

const LIMIT_TIMER = 60;

function PhoneSection({ phoneNumber, onSuccess, userInfo }) {
  const [editingPhone, setEditingPhone] = useState(false);
  const [height, setHeight] = useState(0);
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(LIMIT_TIMER);
  const ref = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (editingPhone && ref.current) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [editingPhone]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= 1) return prev - 1;
        clearInterval(timerRef.current);
        setIsCodeSend(false);
        setOtp("");
        return LIMIT_TIMER;
      });
    }, 1000);
  };

  const resetState = () => {
    setEditingPhone(false);
    setIsCodeSend(false);
    setNewPhoneNumber("");
    setOtp("");
    setCount(LIMIT_TIMER);
    clearInterval(timerRef.current);
  };

  const handlePhoneChange = (e) => {
    if (e.target.value.length < 12) setNewPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    if (e.target.value.length < 6) setOtp(e.target.value);
  };

  const sendOtp = async () => {
    const normalPhone = toEnglishDigits(newPhoneNumber);
    if (!normalPhone || normalPhone.length < 11)
      return errorToast("شماره تلفن صحیح نمیباشد");
    if (!normalPhone.startsWith("09"))
      return errorToast("فرمت شماره تلفن صحیح نمیباشد");

    try {
      setIsLoading(true);
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalPhone }),
      });
      if (res.status === 200) {
        setIsCodeSend(true);
        setCount(LIMIT_TIMER);
        startTimer();
      } else {
        errorToast("ارسال کد با خطا مواجه شد");
      }
    } catch {
      errorToast("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    const normalPhone = toEnglishDigits(newPhoneNumber);
    const normalOtp = toEnglishDigits(otp);
    if (!normalOtp || normalOtp.length < 5)
      return errorToast("کد وارد شده صحیح نمیباشد");

    try {
      setIsVerifying(true);

      const verifyRes = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: normalOtp, phone: normalPhone }),
      });

      if (verifyRes.status === 400) return errorToast("کد مغایرت دارد");
      if (verifyRes.status === 410) return errorToast("کد منقضی شده است");
      if (!verifyRes.ok) return errorToast("خطا در تأیید کد");

      const updateRes = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userInfo, phoneNumber: normalPhone }),
      });
      console.log(updateRes.status);

      if (updateRes.status === 200) {
        return successToast("اطلاعات آپدیت شد");
      } else if (updateRes.status === 401) {
        return errorToast("هویت یافت نشد");
      } else if (updateRes.status === 404) {
        return errorToast("کاربری با این شماره پیدا نشد");
      } else if (updateRes.status === 400) {
        return errorToast("رمز عبور معتبر نبود");
      } else if (updateRes.status === 409) {
        return errorToast("این شماره از قبل در سایت موجود میباشد");
      }
      onSuccess(normalPhone);
      resetState();
    } catch {
      errorToast("خطا در ارتباط با سرور");
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <div
      className="bg-white dark:bg-slate-900
      border border-teal-100 dark:border-slate-800 rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-500/10
            flex items-center justify-center"
          >
            <FiPhone size={15} className="text-teal-500" />
          </div>
          <h3 className="font-Morabba-Bold text-slate-700 dark:text-slate-200 text-sm">
            شماره تلفن
          </h3>
        </div>

        {!editingPhone ? (
          <button
            onClick={() => setEditingPhone(true)}
            className="flex items-center gap-1.5 text-xs font-Dana-Medium
              text-teal-600 dark:text-teal-400 cursor-pointer
              hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-150"
          >
            <FiEdit2 size={13} />
            تغییر
          </button>
        ) : (
          <button
            onClick={resetState}
            className="flex items-center gap-1.5 text-xs font-Dana-Medium cursor-pointer
              text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FiX size={13} />
            انصراف
          </button>
        )}
      </div>

      {editingPhone ? (
        <div>
          <label className="text-[11px] font-Dana-Medium text-slate-400 dark:text-slate-500 mb-1.5 block">
            شماره جدید
          </label>
          <input
            value={newPhoneNumber}
            onChange={handlePhoneChange}
            type="number"
            placeholder="09xxxxxxxxx"
            dir="ltr"
            disabled={isCodeSend}
            className="w-full px-3 py-2.5 rounded-xl text-sm font-Dana-Regular
              text-slate-700 dark:text-slate-200
              bg-slate-50 dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              focus:outline-none focus:border-teal-400 dark:focus:border-teal-500
              focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/30
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150"
          />
        </div>
      ) : (
        <p
          className="px-3 py-2.5 rounded-xl text-sm font-Dana-Regular
          text-slate-700 dark:text-slate-200
          bg-slate-50 dark:bg-slate-800/50
          border border-slate-100 dark:border-slate-800"
          dir="ltr"
        >
          {phoneNumber}
        </p>
      )}

      <div
        className={`flex flex-col transition-all duration-500 ease-in-out gap-4
          ${editingPhone ? "opacity-100" : "opacity-0 overflow-hidden"}`}
        style={{ maxHeight: editingPhone ? `${height}px` : "0px" }}
        ref={ref}
      >
        <div
          className="flex items-start gap-2 text-xs font-Dana-Regular
          text-amber-600 dark:text-amber-400 mt-6
          bg-amber-50 dark:bg-amber-500/10
          border border-amber-200 dark:border-amber-500/20
          rounded-xl px-4 py-3"
        >
          برای تغییر شماره تلفن، یک کد تأیید به شماره جدید ارسال می‌شود
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={sendOtp}
            disabled={isCodeSend}
            className={`w-full px-3 py-2.5 rounded-xl text-sm font-Dana-Medium
              ${
                !isCodeSend
                  ? "bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white cursor-pointer"
                  : "bg-teal-500/40 text-white cursor-not-allowed"
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                لطفا منتظر بمانید
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </span>
            ) : isCodeSend ? (
              `${count} ثانیه تا ارسال مجدد`
            ) : (
              "ارسال کد"
            )}
          </button>

          <input
            value={otp}
            type="number"
            onChange={handleOtpChange}
            readOnly={!isCodeSend}
            placeholder="کد دریافتی را وارد نمایید"
            className={`w-full px-3 py-2.5 rounded-xl text-sm font-Dana-Regular
              text-slate-700 dark:text-slate-200
              bg-slate-50 dark:bg-slate-800 outline-none
              border border-slate-200 dark:border-slate-700
              transition-all duration-150
              ${
                isCodeSend
                  ? "focus:border-teal-400 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/30"
                  : "opacity-60 cursor-not-allowed"
              }`}
          />
        </div>

        <button
          onClick={verifyOtp}
          disabled={!isCodeSend || isVerifying}
          className={`w-full py-3 rounded-xl text-sm font-Morabba-Bold
            transition-all duration-200 text-white
            ${
              isCodeSend && !isVerifying
                ? "bg-teal-500 hover:bg-teal-600 active:bg-teal-700 cursor-pointer"
                : "bg-teal-500/40 cursor-not-allowed"
            }`}
        >
          {isVerifying ? (
            <span className="flex items-center justify-center gap-3">
              درحال سنجش کد
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </span>
          ) : (
            "تایید شماره تلفن"
          )}
        </button>
      </div>
    </div>
  );
}

export default PhoneSection;
