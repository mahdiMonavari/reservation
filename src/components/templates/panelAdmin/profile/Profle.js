"use client";
import { useState } from "react";
import {
  FaStar,
  FaBriefcase,
  FaComments,
  FaClock,
  FaMoneyBillWave,
  FaGraduationCap,
} from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { successToast, errorToast } from "@/components/modules/toast/toast";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import ScoreViewCardProfile from "./ScoreViewCardProfile";
import HeaderCardProfile from "./HeaderCardProfile";
import ProffessionalCardProfile from "./ProffessionalCardProfile";
import AboutMeCardProfile from "./AboutMeCardProfile";

function Profile({ doctor: initialDoctor }) {
  const [doctor, setDoctor] = useState(initialDoctor);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    initialDoctor?.photo || null,
  );
  const [form, setForm] = useState({
    specialty: initialDoctor?.specialty ?? "",
    about: initialDoctor?.about ?? "",
    fieldOfStudy: initialDoctor?.fieldOfStudy ?? "",
    experience: initialDoctor?.experience ?? "",
    avgAppointmentTime: initialDoctor?.avgAppointmentTime ?? "",
    baseFee: initialDoctor?.baseFee ?? "",
    defaultStartHour: doctor?.defaultStartHour ?? "",
    defaultEndHour: doctor?.defaultEndHour ?? "",
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
      defaultStartHour: doctor?.defaultStartHour ?? "",
      defaultEndHour: doctor?.defaultEndHour ?? "",
    });
    setPhotoFile(null);
    setPhotoPreview(doctor?.photo || null);
    setIsEditing(false);
  };
  const handlePadStart = (value) => {
    if (!value) {
      return null;
    }
    const [h, m] = value.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  };
  const handleSave = async () => {
    try {
      form.defaultStartHour = handlePadStart(form.defaultStartHour);
      form.defaultEndHour = handlePadStart(form.defaultEndHour);
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
    {
      name: "defaultStartHour",
      label: "زمان شروع کار",
      icon: <FaMoneyBillWave />,
      color: "text-teal-500",
      type: "number",
    },
    {
      name: "defaultEndHour",
      label: "زمان پایان کار",
      icon: <FaMoneyBillWave />,
      color: "text-yellow-500",
      type: "number",
    },
  ];

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-5">
        <div
          className="rounded-2xl bg-white dark:bg-slate-900
  border border-slate-200 dark:border-slate-800 p-5"
        >
          <div className="flex items-center gap-4">
            <HeaderCardProfile
              photoPreview={photoPreview}
              isEditing={isEditing}
              handlePhotoChange={handlePhotoChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
              setIsEditing={setIsEditing}
              fullName={fullName}
              doctor={doctor}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((item, index) => (
            <ScoreViewCardProfile {...item} key={index} />
          ))}
        </div>

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
            {fields.map((item) => (
              <ProffessionalCardProfile
                key={item.name}
                {...item}
                setForm={setForm}
                isEditing={isEditing}
                doctor={doctor}
                form={form}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>

        <AboutMeCardProfile
          form={form}
          isEditing={isEditing}
          handleChange={handleChange}
          doctor={doctor}
        />
      </div>
    </>
  );
}

export default Profile;
