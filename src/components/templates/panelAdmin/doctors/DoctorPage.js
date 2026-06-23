"use client";
import React, { useEffect, useState } from "react";
import UsersTable from "../usersPage/UsersTable";
import SearchInput from "@/components/modules/admin/Search";
import Pagination from "@/components/modules/pagination/Pagination";
import EmptyState from "@/components/modules/emptyState/EmptyState";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import { errorToast, successToast } from "@/components/modules/toast/toast";
import DeleteModal from "@/components/modules/modal/DeleteModal";
import ProfileDoctor from "./ProfileDoctor";

function DoctorsPage({ initialDoctors, totalPages, currentPage, total }) {
  // doctors برای جدول — ساختار فلت با isActive
  const [doctors, setDoctors] = useState(() =>
    initialDoctors.map((item) => ({ ...item.userId, isActive: item.isActive }))
  );

  // selectedDoctor همیشه از initialDoctors میاد — ساختار کامل { userId, isActive, ... }
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setDoctors(
      initialDoctors.map((item) => ({
        ...item.userId,
        isActive: item.isActive,
      }))
    );
  }, [initialDoctors]);

  // --- Delete ---
  const openDeleteModal = (id) => {
    const target = initialDoctors.find((d) => d.userId._id === id);
    setSelectedDoctor(target);
    setIsDeleteModalOpen(true);
  };

  const onDelete = async () => {
    if (!selectedDoctor) return;
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/admin/doctor/${selectedDoctor.userId._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        const { data } = await res.json();
        console.log(doctors, data);
        setDoctors((prev) => prev.filter((item) => item._id !== data));
        successToast("حذف دکتر موفقیت آمیز بود");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  // --- Toggle Active ---
  const onToggleActive = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/doctor/${id}`, { method: "PUT" });
      if (res.status === 200) {
        successToast("وضعیت دکتر تغییر کرد");
        setDoctors((prev) =>
          prev.map((d) => (d._id === id ? { ...d, isActive: !d.isActive } : d))
        );
      } else if (res.status === 400) {
        errorToast("فیلدهای اجباری دکتر پر نشده است");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Profile ---
  const showDoctorProfile = (id) => {
    const target = initialDoctors.find((d) => d.userId._id === id);
    setSelectedDoctor(target);
    setIsProfileOpen(true);
  };

  return (
    <>
      <LoadingOverlay loading={isLoading} />

      <ProfileDoctor
        isProfileOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        doctor={selectedDoctor}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
        title={`${selectedDoctor?.userId?.firstName ?? ""} ${selectedDoctor?.userId?.lastName ?? ""}`}
      />

      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100">
              لیست دکترها
            </h1>
            <p className="text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 mt-0.5">
              <span className="text-violet-500 block mt-2 dark:text-violet-400 font-Morabba-Bold">
                {total} دکتر در سایت موجود است
              </span>
            </p>
          </div>
          <SearchInput />
        </div>

        {doctors.length ? (
          <UsersTable
            showDoctorProfile={showDoctorProfile}
            users={doctors}
            onDelete={openDeleteModal}
            onToggleActive={onToggleActive}
          />
        ) : (
          <EmptyState title={"دکتری یافت نشد"} />
        )}
      </div>

      {doctors.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
}

export default DoctorsPage;
