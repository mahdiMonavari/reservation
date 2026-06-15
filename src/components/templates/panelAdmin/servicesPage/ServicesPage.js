"use client";

import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import Modal from "@/components/modules/modal/Modal";
import DeleteModal from "@/components/modules/modal/DeleteModal";
import { successToast } from "@/components/modules/toast/toast";
import ServiceCard from "./serviceCard";
import EmptyState from "@/components/modules/emptyState/EmptyState";

const SERVICE_FIELDS = [
  { name: "title", label: "عنوان خدمت", type: "text" },
  { name: "price", label: "قیمت (تومان)", type: "number" },
  { name: "duration", label: "مدت زمان (دقیقه)", type: "number" },
  { name: "description", label: "توضیحات", type: "textarea" },
];

const MODAL_TITLES = {
  create: "افزودن خدمت جدید",
  edit: (title) => `ویرایش خدمت ${title}`,
  delete: (title) => title,
};

function ServicesPage({ initialServices = [] }) {
  const { user } = useContext(AuthContext);

  const [services, setServices] = useState(initialServices);
  const [formData, setFormData] = useState({});
  const [selectedService, setSelectedService] = useState({});
  const [modalTitle, setModalTitle] = useState(MODAL_TITLES.create);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedService({});
    setModalTitle(MODAL_TITLES.create);
    setIsEditModalOpen(true);
  };

  const openEditModal = (id) => {
    const target = services.find((s) => s._id === id);
    setModalMode("edit");
    setSelectedService(target);
    setModalTitle(MODAL_TITLES.edit(target.title));
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    const target = services.find((s) => s._id === id);
    setSelectedService(target);
    setModalTitle(MODAL_TITLES.delete(target.title));
    setIsDeleteModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, doctorId: user._id }),
    });
    if (res.status === 201) {
      const { data } = await res.json();
      setServices((prev) => [data, ...prev]);
      successToast("خدمت با موفقیت اضافه شد");
    }
  };

  const handleEdit = async () => {
    const res = await fetch(`/api/services/${selectedService._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, doctorId: user._id }),
    });
    if (res.status === 200) {
      const { data } = await res.json();
      setServices((prev) => prev.map((s) => (s._id === data._id ? data : s)));
      successToast("خدمت با موفقیت ویرایش شد");
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/services/${selectedService._id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      const { data } = await res.json();
      setServices((prev) => prev.filter((s) => s._id !== data._id));
      successToast("حذف سرویس موفقیت آمیز بود");
    }
  };

  return (
    <>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              خدمات
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              {services.length} خدمت ثبت شده
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
              bg-violet-600 hover:bg-violet-700
              text-white text-sm font-bold
              shadow-md shadow-violet-200 dark:shadow-violet-900/30
              transition-all duration-200 active:scale-95"
          >
            <FaPlus />
            افزودن خدمت
          </button>
        </div>
        {services.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="خدماتی ثبت نشده" />
        )}
      </div>

      <Modal
        formData={formData}
        setFormData={setFormData}
        title={modalTitle}
        fields={SERVICE_FIELDS}
        isOpen={isEditModalOpen}
        data={selectedService}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={modalMode === "create" ? handleCreate : handleEdit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={modalTitle}
      />
    </>
  );
}

export default ServicesPage;
