"use client";
import { useState } from "react";
import PhoneSection from "./PhoneSection";
import PublicInfo from "./PoblicInfo";

function UserProfilePage({ info }) {
  const [userInfo, setUserInfo] = useState(info);

  return (
    <div className="max-w-2xl pb-10">
      <div className="mb-6">
        <h2 className="text-xl font-Morabba-Bold text-slate-800 dark:text-white">
          پروفایل من
        </h2>
        <p className="text-sm font-Dana-Regular text-slate-400 dark:text-slate-500 mt-1">
          اطلاعات حساب کاربری شما
        </p>
      </div>

      <div
        className="flex items-center gap-4 mb-6 p-5
        bg-white dark:bg-slate-900
        border border-teal-100 dark:border-slate-800 rounded-2xl"
      >
        <div
          className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-500/20
          flex items-center justify-center shrink-0"
        >
          <span className="text-teal-600 dark:text-teal-300 font-Morabba-Bold text-2xl">
            {userInfo?.firstName?.[0]}
          </span>
        </div>
        <div>
          <p className="font-Morabba-Bold text-slate-800 dark:text-white">
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
          <p className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500 mt-1">
            {userInfo?.phoneNumber}
          </p>
        </div>
      </div>

      <PublicInfo
        userInfo={userInfo}
        onSuccess={(updated) =>
          setUserInfo((prev) => ({ ...prev, ...updated }))
        }
      />
      <PhoneSection
        userInfo={userInfo}
        phoneNumber={userInfo.phoneNumber}
        onSuccess={(newPhone) =>
          setUserInfo((prev) => ({ ...prev, phoneNumber: newPhone }))
        }
      />
    </div>
  );
}

export default UserProfilePage;
