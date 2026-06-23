"use client";
import { useState } from "react";
import {
  FaUserMd,
  FaStar,
  FaBriefcase,
  FaComments,
  FaClock,
  FaMoneyBillWave,
  FaGraduationCap,
  FaCheckCircle,
  FaBan,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import { MdInfo, MdMedicalServices } from "react-icons/md";
import { successToast, errorToast } from "@/components/modules/toast/toast";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";

function Profile({ doctor: initialDoctor }) {
  const [doctor, setDoctor] = useState(initialDoctor);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    initialDoctor?.photo || null
  );
  const [form, setForm] = useState({
    specialty: initialDoctor?.specialty ?? "",
    about: initialDoctor?.about ?? "",
    fieldOfStudy: initialDoctor?.fieldOfStudy ?? "",
    experience: initialDoctor?.experience ?? "",
    avgAppointmentTime: initialDoctor?.avgAppointmentTime ?? "",
    baseFee: initialDoctor?.baseFee ?? "",
  });

  const user = doctor?.userId || {};
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setForm({
      specialty: doctor?.specialty ?? "",
      about: doctor?.about ?? "",
      fieldOfStudy: doctor?.fieldOfStudy ?? "",
      experience: doctor?.experience ?? "",
      avgAppointmentTime: doctor?.avgAppointmentTime ?? "",
      baseFee: doctor?.baseFee ?? "",
    });
    setPhotoFile(null);
    setPhotoPreview(doctor?.photo || null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (photoFile) formData.append("photo", photoFile);

      const res = await fetch("/api/admin/doctor/profile", {
        method: "PUT",
        body: formData,
      });

      const json = await res.json();

      if (res.ok) {
        setDoctor(json.data);
        setPhotoPreview(json.data?.photo || null);
        setPhotoFile(null);
        setIsEditing(false);
        if (json.data?.isActive) {
          successToast("پروفایل ذخیره شد و حساب شما فعال گردید 🎉");
        } else {
          successToast("پروفایل با موفقیت ذخیره شد");
        }
      } else {
        errorToast(json.message || "خطا در ذخیره اطلاعات");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      icon: <FaStar />,
      label: "امتیاز",
      value: doctor?.rating ?? "—",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
    },
    {
      icon: <FaComments />,
      label: "تعداد نظرات",
      value: doctor?.reviewsCount ?? "—",
      color: "text-sky-500",
      bg: "bg-sky-50 dark:bg-sky-900/20",
      border: "border-sky-200 dark:border-sky-800",
    },
  ];

  const fields = [
    {
      name: "specialty",
      label: "تخصص",
      icon: <MdMedicalServices />,
      color: "text-violet-500",
      type: "text",
    },
    {
      name: "fieldOfStudy",
      label: "رشته تحصیلی",
      icon: <FaGraduationCap />,
      color: "text-slate-500",
      type: "text",
    },
    {
      name: "experience",
      label: "سابقه کار (سال)",
      icon: <FaBriefcase />,
      color: "text-violet-500",
      type: "number",
    },
    {
      name: "avgAppointmentTime",
      label: "زمان ویزیت (دقیقه)",
      icon: <FaClock />,
      color: "text-emerald-500",
      type: "number",
    },
    {
      name: "baseFee",
      label: "حق ویزیت (تومان)",
      icon: <FaMoneyBillWave />,
      color: "text-rose-500",
      type: "number",
    },
  ];

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* ── Hero ── */}
        <div
          className="rounded-2xl bg-white dark:bg-slate-900
  border border-slate-200 dark:border-slate-800 p-5"
        >
          <div className="flex items-center gap-4">
            {/* avatar */}
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

            {/* info */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-2">
                <h1 className="text-base font-Morabba-Bold text-slate-800 dark:text-slate-100 truncate">
                  {fullName || "نام نامشخص"}
                </h1>

                {/* actions */}
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

              {/* badges */}
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
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-2xl border ${s.bg} ${s.border}`}
            >
              <span className={`text-2xl ${s.color}`}>{s.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {s.label}
                </span>
                <span className="text-lg font-Morabba-Bold text-slate-700 dark:text-slate-200">
                  {s.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Fields ── */}
        <div
          className="rounded-2xl bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-Morabba-Bold text-slate-700 dark:text-slate-200">
              اطلاعات حرفه‌ای
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
            {fields.map((f) => (
              <div
                key={f.name}
                className="flex flex-col gap-2 p-4 rounded-xl
                bg-slate-50 dark:bg-slate-800/50
                border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-base ${f.color}`}>{f.icon}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-Dana-Medium">
                    {f.label}
                  </span>
                </div>
                {isEditing ? (
                  <input
                    name={f.name}
                    type={f.type}
                    value={form[f.name]}
                    onChange={handleChange}
                    className="bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      rounded-lg px-3 py-2 text-sm font-Dana-Medium
                      text-slate-700 dark:text-slate-200
                      focus:outline-none focus:ring-2 focus:ring-violet-400
                      transition-all duration-150"
                  />
                ) : (
                  <span className="text-sm font-Morabba-Bold text-slate-700 dark:text-slate-200">
                    {f.name === "baseFee" && doctor?.[f.name]
                      ? Number(doctor[f.name]).toLocaleString("fa-IR")
                      : doctor?.[f.name] || "—"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── About ── */}
        <div
          className="rounded-2xl bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <MdInfo className="text-slate-400" />
            <h2 className="text-sm font-Morabba-Bold text-slate-700 dark:text-slate-200">
              درباره من
            </h2>
          </div>
          <div className="p-5">
            {isEditing ? (
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                rows={5}
                placeholder="درباره خود بنویسید..."
                className="w-full bg-slate-50 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  rounded-xl px-4 py-3 text-sm font-Dana-Medium
                  text-slate-700 dark:text-slate-200
                  focus:outline-none focus:ring-2 focus:ring-violet-400
                  resize-none transition-all duration-150 leading-relaxed"
              />
            ) : (
              <p className="text-sm font-Dana-Medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {doctor?.about || "توضیحاتی ثبت نشده است."}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
