"use client";
import React, { useEffect, useState } from "react";
import { FiUser, FiEdit2, FiSave, FiX } from "react-icons/fi";
import { successToast, errorToast } from "@/components/modules/toast/toast";

const FIELDS = [
  { label: "نام", type: "text", key: "firstName" },
  { label: "نام خانوادگی", type: "text", key: "lastName" },
  { label: "رمز عبور جدید", type: "password", key: "password" },
];

function PoblicInfo({ userInfo, onSuccess }) {
  const [editingInfo, setEditingInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    setInfo(
      FIELDS.map((field) => ({
        ...field,
        value: field.key === "password" ? "" : userInfo?.[field.key] || "",
      }))
    );
  }, []);

  const handleChange = (key, value) => {
    setInfo((prev) =>
      prev.map((field) => (field.key === key ? { ...field, value } : field))
    );
  };

  const handleCancel = () => {
    setInfo(
      FIELDS.map((field) => ({
        ...field,
        value: field.key === "password" ? "" : userInfo?.[field.key] || "",
      }))
    );
    setEditingInfo(false);
  };

  const handleSave = async () => {
    const changed = {};
    for (const field of info) {
      if (field.key === "password") {
        if (field.value === "") continue;
        if (field.value.length < 8)
          return errorToast("رمز عبور باید حداقل ۸ کاراکتر باشد");
        changed.password = field.value;
      } else {
        changed[field.key] = field.value;
      }
    }

    if (!Object.keys(changed).length) {
      setEditingInfo(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...changed, phoneNumber: userInfo.phoneNumber }),
      });

      if (res.ok) {
        successToast("اطلاعات با موفقیت ذخیره شد");
        onSuccess(changed);
        setEditingInfo(false);
        setInfo((prev) =>
          prev.map((f) => (f.key === "password" ? { ...f, value: "" } : f))
        );
      } else {
        const messages = {
          400: "اطلاعات وارد شده صحیح نمی‌باشد",
          401: "عدم دسترسی",
          404: "کاربری یافت نشد",
        };
        errorToast(messages[res.status] || "خطای سرور");
      }
    } catch {
      errorToast("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-white dark:bg-slate-900
      border border-teal-100 dark:border-slate-800 rounded-2xl p-5 mb-4"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-500/10
            flex items-center justify-center"
          >
            <FiUser size={15} className="text-teal-500" />
          </div>
          <h3 className="font-Morabba-Bold text-slate-700 dark:text-slate-200 text-sm">
            اطلاعات عمومی
          </h3>
        </div>

        {!editingInfo ? (
          <button
            onClick={() => setEditingInfo(true)}
            className="flex items-center gap-1.5 text-xs font-Dana-Medium
              text-teal-600 dark:text-teal-400 cursor-pointer
              hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-150"
          >
            <FiEdit2 size={13} />
            ویرایش
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-xs font-Dana-Medium cursor-pointer
                text-emerald-600 dark:text-emerald-400 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSave size={13} />
              )}
              ذخیره
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-xs font-Dana-Medium cursor-pointer
                text-slate-400 hover:text-slate-600 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiX size={13} />
              انصراف
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {info.map((field) => (
          <div key={field.key}>
            <label className="text-[11px] font-Dana-Medium text-slate-400 dark:text-slate-500 mb-1.5 block">
              {field.label}
            </label>
            {editingInfo ? (
              <input
                type={field.type}
                value={field.value}
                placeholder={field.key === "password" ? "حداقل ۸ کاراکتر" : ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-sm font-Dana-Regular
                  text-slate-700 dark:text-slate-200
                  bg-slate-50 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  focus:outline-none focus:border-teal-400 dark:focus:border-teal-500
                  focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/30
                  transition-all duration-150"
              />
            ) : (
              <p
                className="px-3 py-2.5 rounded-xl text-sm font-Dana-Regular
                text-slate-700 dark:text-slate-200
                bg-slate-50 dark:bg-slate-800/50
                border border-slate-100 dark:border-slate-800"
              >
                {field.key === "password" ? "••••••••" : field.value || "—"}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PoblicInfo;
