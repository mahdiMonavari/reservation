import React from "react";

import {
  FaUserMd,
  FaCheckCircle,
  FaBan,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaBriefcase,
} from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";

function HeaderCardProfile({
  photoPreview,
  isEditing,
  handlePhotoChange,
  handleSave,
  handleCancel,
  setIsEditing,
  fullName,
  doctor,
}) {
  return (
    <>
      <label
        className={`relative shrink-0 ${isEditing ? "cursor-pointer group" : ""}`}
      >
        <div
          className="w-20 h-20 rounded-2xl overflow-hidden
        bg-violet-100 dark:bg-violet-900/30
        text-violet-400 flex items-center justify-center"
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserMd size={32} />
          )}
        </div>
        {isEditing && (
          <>
            <div
              className="absolute inset-0 rounded-2xl bg-black/50
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            >
              <FaCamera size={14} className="text-white" />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </>
        )}
      </label>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-base font-Morabba-Bold text-slate-800 dark:text-slate-100 truncate">
            {fullName || "نام نامشخص"}
          </h1>
          <div className="flex items-center gap-1.5 shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-Dana-Medium
                  bg-violet-500 hover:bg-violet-600 text-white
                  transition-all duration-150 active:scale-95"
                >
                  <FaSave size={10} /> ذخیره
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-Dana-Medium
                  text-slate-500 bg-slate-100 dark:bg-slate-800
                  hover:bg-slate-200 dark:hover:bg-slate-700
                  transition-all duration-150 active:scale-95"
                >
                  <FaTimes size={10} /> انصراف
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-Dana-Medium
                text-violet-600 dark:text-violet-400
                bg-violet-50 dark:bg-violet-900/20
                border border-violet-200 dark:border-violet-800
                hover:bg-violet-100 transition-all duration-150 active:scale-95"
              >
                <FaEdit size={10} /> ویرایش
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {doctor?.specialty && (
            <span
              className="flex items-center gap-1 text-xs font-Dana-Medium
            text-violet-600 dark:text-violet-400
            bg-violet-50 dark:bg-violet-900/20
            border border-violet-200 dark:border-violet-800
            px-2 py-0.5 rounded-full"
            >
              <MdMedicalServices size={10} /> {doctor.specialty}
            </span>
          )}
          {doctor?.experience && (
            <span
              className="flex items-center gap-1 text-xs font-Dana-Medium
            text-slate-500 dark:text-slate-400
            bg-slate-100 dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            px-2 py-0.5 rounded-full"
            >
              <FaBriefcase size={10} /> {doctor.experience} سال
            </span>
          )}
          {doctor?.isActive ? (
            <span
              className="flex items-center gap-1 text-xs font-Dana-Medium
            text-emerald-600 dark:text-emerald-400
            bg-emerald-50 dark:bg-emerald-900/20
            border border-emerald-200 dark:border-emerald-800
            px-2 py-0.5 rounded-full"
            >
              <FaCheckCircle size={10} /> فعال
            </span>
          ) : (
            <span
              className="flex items-center gap-1 text-xs font-Dana-Medium
            text-rose-500 dark:text-rose-400
            bg-rose-50 dark:bg-rose-900/20
            border border-rose-200 dark:border-rose-800
            px-2 py-0.5 rounded-full"
            >
              <FaBan size={10} /> غیرفعال
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default HeaderCardProfile;
