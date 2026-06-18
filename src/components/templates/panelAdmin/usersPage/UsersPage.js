"use client";
import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import HeaderPage from "@/components/modules/admin/HeaderPage";
import SearchInput from "@/components/modules/admin/Search";
import Pagination from "@/components/modules/pagination/Pagination";
import EmptyState from "@/components/modules/emptyState/EmptyState";
import Modal from "@/components/modules/modal/Modal";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import { errorToast, successToast } from "@/components/modules/toast/toast";
import DeleteModal from "@/components/modules/modal/DeleteModal";

const USER_FIELDS = [
  { name: "phoneNumber", label: "شماره همراه", type: "number" },
  { name: "firstName", label: "نام کاربر", type: "text" },
  { name: "lastName", label: "نام خانوادی کاربر", type: "text" },
  { name: "password", label: "رمز عبور", type: "number" },
];

const USER_FIELDS_EDIT = [
  { name: "phoneNumber", label: "شماره همراه", type: "number" },
  { name: "firstName", label: "نام کاربر", type: "text" },
  { name: "lastName", label: "نام خانوادی کاربر", type: "text" },
  {
    name: "role",
    label: "نقش کاربر را وارد کنید",
    type: "select",
    fields: [
      { value: "DOCTOR", name: "role", title: "دکتر" },
      { value: "USER", name: "role", title: "کاربر" },
      { value: "ADMIN", name: "role", title: "ادمین" },
    ],
  },
];

const typeTitle = {
  create: () => "ایجاد کاربر جدید",
  delete: (name) => `آیا از حذف کاربر ${name} مطمئن هستید؟`,
  edit: (name) => `ویرایش کاربر ${name}`,
};

function UsersPage({ initialUsers, totalPages, currentPage, total }) {
  const [userFields, setUserFields] = useState(USER_FIELDS);
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState("create");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const onClose = () => setIsModalOpen(false);
  const openEditModal = (id) => {
    setUserFields(USER_FIELDS_EDIT);
    setIsModalOpen(true);
    setState("edit");
    const target = users.find((user) => user._id === id);
    setUser(target);
  };
  const deleteModalOnClose = () => setIsDeleteModalOpen(false);
  const openDeleteModal = (id) => {
    setState("delete");
    setIsDeleteModalOpen(true);
    const target = users.find((user) => user._id === id);
    setUser(target);
  };
  const openCreateModal = () => {
    setUserFields(USER_FIELDS);
    setIsModalOpen(true);
    setUser({});
    setState("create");
  };
  const onEdit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (res.status === 200) {
        const { data } = await res.json();
        setUsers((prev) =>
          prev.map((item) => (item._id === data._id ? data : item))
        );
        successToast("ویرایش موفقیت آمیز بود");
      } else {
        errorToast("خطایی پیش آمده دوباره امتحان کنید");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };
  const onCreate = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        const { data } = await res.json();
        setUsers((prev) => [...prev, data]);
        successToast("ثبت نام موفقیت آمیز بود");
      } else {
        errorToast("خطایی پیش آمده دوباره امتحان کنید");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };
  const onBan = async () => {};
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
  const choseHandler = () => {
    if (state === "create") return onCreate();
    if (state === "edit") return onEdit();
    if (state === "delete") return onDelete();
  };
  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <Modal
        formData={formData}
        setFormData={setFormData}
        title={typeTitle[state](`${user.firstName} ${user.lastName}`)}
        fields={userFields}
        isOpen={isModalOpen}
        data={user}
        onClose={onClose}
        onConfirm={choseHandler}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={deleteModalOnClose}
        onConfirm={onDelete}
        title={typeTitle[state](`${user.firstName} ${user.lastName}`)}
      />
      <div className="p-6 flex flex-col gap-6">
        <HeaderPage
          title={"کاربر"}
          total={total}
          onOpen={openCreateModal}
          titlePage={"کاربران"}
          Other={SearchInput}
        />
        {users.length ? (
          <UsersTable
            users={users}
            onEdit={openEditModal}
            onBan={""}
            onDelete={openDeleteModal}
          />
        ) : (
          <EmptyState title={"کاربری یافت نشد"} />
        )}
      </div>
      {users && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
}

export default UsersPage;
