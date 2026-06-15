"use client";
import React from "react";
import UsersTable from "./UsersTable";

function UsersPage({ initialUsers, totalPages, currentPage, search }) {
  const openEditModal = () => {};
  const openDeleteModal = () => {};
  const openCreateModal = () => {};
  const onEdit = async () => {};
  const onBan = async () => {};
  const onDelete = async () => {};
  return (
    <>
      <div className="m-4 mt-0">
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
