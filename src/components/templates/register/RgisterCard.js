"use client";
import RegisterForm from "@/components/templates/register/RegisterForm";
import VerifyNumber from "@/components/templates/register/VerifyNumber";
import Link from "next/link";
import { RiLoginBoxLine } from "react-icons/ri";
import { useState } from "react";

const STEPS = ["تأیید شماره", "اطلاعات حساب"];
const SUBS = ["شماره موبایل خود را وارد کنید", "مشخصات خود را تکمیل کنید"];

function RegisterCard() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden
    bg-gray-100 dark:bg-slate-950"
    >
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
        <div
          className="relative bg-white/80 dark:bg-white/5
          backdrop-blur-xl rounded-3xl
          border border-emerald-200/80 dark:border-white/10
          shadow-xl shadow-emerald-900/10 dark:shadow-emerald-950/50 overflow-hidden"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

          <div className="px-8 pt-8 pb-10">
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

            <div className="flex items-center justify-center gap-2 mb-5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500
                    ${
                      (isPhoneVerified ? 1 : 0) >= i
                        ? "w-8 bg-emerald-500"
                        : "w-5 bg-emerald-200 dark:bg-emerald-500/20"
                    }`}
                />
              ))}
            </div>

            <h1
              className="text-xl font-Morabba-Bold text-center
              text-emerald-900 dark:text-white mb-1"
            >
              {STEPS[isPhoneVerified ? 1 : 0]}
            </h1>
            <p
              className="text-center text-sm font-Dana-Medium
              text-emerald-600/70 dark:text-emerald-300/60 mb-7"
            >
              {SUBS[isPhoneVerified ? 1 : 0]}
            </p>

            {!isPhoneVerified ? (
              <VerifyNumber
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                setIsPhoneVerified={setIsPhoneVerified}
              />
            ) : (
              <RegisterForm phoneNumber={phoneNumber} />
            )}

            <div className="mt-5 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-Dana-Medium
                  text-emerald-600/60 dark:text-emerald-300/50
                  hover:text-emerald-700 dark:hover:text-emerald-300
                  transition-colors duration-200 group"
              >
                <RiLoginBoxLine className="group-hover:scale-110 transition-transform" />
                حساب دارید؟ وارد شوید
              </Link>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default RegisterCard;
