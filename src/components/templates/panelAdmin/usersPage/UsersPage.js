"use client";
import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import HeaderPage from "@/components/modules/admin/HeaderPage";
import SearchInput from "@/components/modules/admin/Search";
import Pagination from "@/components/modules/pagination/Pagination";
import EmptyState from "@/components/modules/emptyState/EmptyState";
import Modal from "@/components/modules/modal/Modal";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";

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
];

function UsersPage({ initialUsers, totalPages, currentPage, total }) {
  const [userFields, setUserFields] = useState(USER_FIELDS);
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState("create");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
  const openDeleteModal = () => {};
  const openCreateModal = () => {
    setUserFields(USER_FIELDS);
    setIsModalOpen(true);
    setUser({});
    setState("create");
  };
  const onEdit = async () => {
    console.log(user);
  };
  const onCreate = async () => {
    setIsLoading(true);
    const res = await fetch("/api/admin/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setIsLoading(false);
    if (res.status === 201) {
      const { data } = await res.json();
      setUsers((prev) => [...prev, data]);
    }
  };
  const onBan = async () => {};
  const onDelete = async () => {};
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
        title={"ایجاد کاربر جدید"}
        fields={userFields}
        isOpen={isModalOpen}
        data={user}
        onClose={onClose}
        onConfirm={choseHandler}
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
