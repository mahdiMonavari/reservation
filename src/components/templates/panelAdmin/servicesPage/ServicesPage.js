"use client";

import { useContext, useEffect, useState } from "react";
import Modal from "@/components/modules/modal/Modal";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import { successToast } from "@/components/modules/toast/toast";
import DeleteModal from "@/components/modules/modal/DeleteModal";

const serviceFields = [
  { name: "title", label: "عنوان خدمت", type: "text" },
  { name: "price", label: "قیمت (تومان)", type: "number" },
  { name: "duration", label: "مدت زمان (دقیقه)", type: "number" },
  { name: "description", label: "توضیحات", type: "textarea" },
];

function ServicesPage() {
  const { user } = useContext(AuthContext);
  const [modalMode, setModalMode] = useState("create");
  const [services, setServices] = useState({});
  const [formData, setFormData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldData, setFieldData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [titleModal, seTitleModal] = useState("افزودن خدمت جدید");
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    handelGetServices();
  }, []);
  const handelGetServices = async () => {
    try {
      setIsloading(true);
      const res = await fetch("/api/services");
      if (res.ok) {
        const { data } = await res.json();
        return setServices(data);
      }
      throw new Error("has error");
    } catch (err) {
      return setError(true);
    } finally {
      return setIsloading(false);
    }
  };
  const onClose = () => setIsModalOpen(false);
  const editHandler = (id) => {
    setModalMode("edit");
    setIsModalOpen(true);
    const targetService = services.find((service) => service._id === id);
    seTitleModal(`ویرایش خدمت ${targetService.title}`);
    setFieldData(targetService);
  };
  const deleteHanlder = (id) => {
    setDeleteModal(true);
    const targetService = services.find((service) => service._id === id);
    seTitleModal(`${targetService.title}`);
    setFieldData(targetService);
  };
  const deleteService = async () => {
    const res = await fetch(`/api/services/${fieldData._id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      const { data } = await res.json();
      setServices((prev) => prev.filter((item) => item._id !== data._id));
      successToast("حذف سرویس موفقیت آمیز بود");
    }
  };
  const editServiceHanlder = async () => {
    const res = await fetch(`/api/services/${fieldData._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...formData, doctorId: user._id }),
    });
    if (res.status === 200) {
      successToast("خدمت با موفقیت ویرایش شد");
      const { data } = await res.json();
      setServices((prev) =>
        prev.map((item) => (item._id === data._id ? data : item))
      );
    }
  };
  const createNewService = async () => {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...formData, doctorId: user._id }),
    });
    if (res.status === 201) {
      successToast("خدمت با موفقیت اضافه شد");
      const { data } = await res.json();
      setServices((prev) => [data, ...prev]);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 gap-6">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-2xl
          bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-2xl"
        >
          ✕
        </div>
        <div className="text-center flex flex-col gap-1.5">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            خطا در دریافت اطلاعات
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            متأسفانه مشکلی پیش آمد، لطفاً دوباره تلاش کنید
          </p>
        </div>
        <button
          onClick={() => {
            setError(false);
            handelGetServices();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold
            shadow-md shadow-violet-200 dark:shadow-violet-900/30
            transition-all duration-200 active:scale-95"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <div className="p-6 flex flex-col gap-6">
        {/* header */}
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
            onClick={() => {
              setIsModalOpen(true);
              setModalMode("create");
              seTitleModal(`افزودن خدمت جدید`);
              setFieldData({});
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
            bg-violet-600 hover:bg-violet-700
            text-white text-sm font-bold
            shadow-md shadow-violet-200 dark:shadow-violet-900/30
            transition-all duration-200 active:scale-95"
          >
            <span>
              <FaPlus />
            </span>
            افزودن خدمت
          </button>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.length
            ? services.map((service) => (
                <div
                  key={service._id}
                  className="flex flex-col gap-4 p-5 rounded-2xl
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              shadow-sm shadow-slate-100 dark:shadow-slate-950/50
              hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-slate-950
              transition-all duration-200"
                >
                  {/* card header */}
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl
                bg-violet-100 dark:bg-violet-900/30
                text-violet-600 dark:text-violet-400 shrink-0"
                    >
                      ✦
                    </div>
                    <div className="flex-1 text-right">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                        {service.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-md line-clamp-2 text-slate-400 dark:text-slate-500 leading-relaxed">
                    {service.description}
                  </p>

                  {/* divider */}
                  <div className="h-px bg-slate-100 dark:bg-slate-800" />

                  {/* info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-Morabba-Bold">
                        {service.duration} دقیقه
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-Morabba-Bold">
                        {Number(service.price).toLocaleString()} تومان
                      </span>
                    </div>
                  </div>

                  {/* actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        editHandler(service._id);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5
                  py-2 rounded-xl text-xs font-bold
                  text-violet-600 dark:text-violet-400
                  bg-violet-50 dark:bg-violet-900/20
                  hover:bg-violet-100 dark:hover:bg-violet-900/40
                  transition-colors duration-150"
                    >
                      <FaEdit size={11} />
                      ویرایش
                    </button>
                    <button
                      onClick={() => deleteHanlder(service._id)}
                      className="flex-1 flex items-center justify-center gap-1.5
                  py-2 rounded-xl text-xs font-bold
                  text-red-500 dark:text-red-400
                  bg-red-50 dark:bg-red-900/20
                  hover:bg-red-100 dark:hover:bg-red-900/40
                  transition-colors duration-150"
                    >
                      <FaTrash size={11} />
                      حذف
                    </button>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      <Modal
        formData={formData}
        setFormData={setFormData}
        title={titleModal}
        fields={serviceFields}
        isOpen={isModalOpen}
        data={fieldData}
        onClose={onClose}
        onConfirm={
          modalMode === "create" ? createNewService : editServiceHanlder
        }
      />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={deleteService}
        title={titleModal}
      />
    </>
  );
}

export default ServicesPage;
