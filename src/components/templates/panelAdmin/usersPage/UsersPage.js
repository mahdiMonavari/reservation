"use client";
import React from "react";
import UsersTable from "./UsersTable";
import HeaderPage from "@/components/modules/admin/HeaderPage";
import SearchInput from "@/components/modules/admin/Search";

function UsersPage({ initialUsers, totalPages, currentPage, search, total }) {
  const openEditModal = () => {};
  const openDeleteModal = () => {};
  const openCreateModal = () => {};
  const onEdit = async () => {};
  const onBan = async () => {};
  const onDelete = async () => {};
  return (
    <>
      <div className="p-6 flex flex-col gap-6">
        <HeaderPage
          title={"کاربر"}
          total={total}
          onOpen={openCreateModal}
          titlePage={"کاربران"}
          Other={SearchInput}
        />
        <UsersTable
          users={initialUsers}
          onEdit={(id) => console.log("edit", id)}
          onBan={(id) => console.log("ban", id)}
          onDelete={(id) => console.log("delete", id)}
        />
      </div>
    </>
  );
}

export default UsersPage;
