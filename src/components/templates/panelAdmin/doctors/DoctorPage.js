"use client";
import React, { useEffect, useState } from "react";
import UsersTable from "../usersPage/UsersTable";
import SearchInput from "@/components/modules/admin/Search";
import Pagination from "@/components/modules/pagination/Pagination";
import EmptyState from "@/components/modules/emptyState/EmptyState";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import { errorToast, successToast } from "@/components/modules/toast/toast";
import DeleteModal from "@/components/modules/modal/DeleteModal";

function DoctorsPage({ initialDoctors, totalPages, currentPage, total }) {
  const [doctors, setDoctors] = useState(() =>
    initialDoctors.map((item) => ({ ...item.userId, isActive: item.isActive }))
  );
  const [doctor, setDoctor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  useEffect(() => {
    initialDoctors.map((item) => ({ ...item.userId, isActive: item.isActive }));
  }, [initialDoctors]);

  const deleteModalOnClose = () => setIsDeleteModalOpen(false);
  const openDeleteModal = (id) => {
    console.log(id);
    setIsDeleteModalOpen(true);
    const target = doctors.find((user) => user._id === id);
    setDoctor(target);
  };
  const onToggleActive = async (id) => {
    const res = await fetch(`api/admin/doctor/${id}`, {
      method: "PUT",
    });
    console.log(res);
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/user/${user._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const { data } = await res.json();
        setUsers((prev) => prev.filter((item) => item._id !== data._id));
        successToast("حذف کاربر موفقیت آمیز بود");
      }
    } catch (err) {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={deleteModalOnClose}
        onConfirm={onDelete}
        title={`آیا از حذف دکتر ${doctor.firstName} ${doctor.lastName} مطمئن هستید؟`}
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100">
              لیست دکترها
            </h1>
            <p className="text-sm font-Dana-Medium flex items-center gap-1.5 text-slate-400 dark:text-slate-500 mt-0.5">
              <span className="text-violet-500 block mt-2 dark:text-violet-400 font-Morabba-Bold">
                {total} دکتر در سایت موجود است
              </span>
            </p>
          </div>
          <SearchInput />
        </div>
        {doctors.length ? (
          <UsersTable
            users={doctors}
            onDelete={openDeleteModal}
            onToggleActive={onToggleActive}
          />
        ) : (
          <EmptyState title={"دکتری یافت نشد"} />
        )}
      </div>
      {doctors && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
}

export default DoctorsPage;
