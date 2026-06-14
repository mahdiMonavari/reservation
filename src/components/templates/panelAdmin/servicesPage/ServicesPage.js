"use client";

import { useState } from "react";
import Modal from "@/components/modules/modal/Modal";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const serviceFields = [
  { name: "title", label: "عنوان خدمت", type: "text" },
  { name: "price", label: "قیمت (تومان)", type: "number" },
  { name: "duration", label: "مدت زمان (دقیقه)", type: "number" },
  { name: "description", label: "توضیحات", type: "textarea" },
];

const mockServices = [
  {
    _id: "1",
    title: "معاینه عمومی",
    price: 150000,
    duration: 30,
    description: "معاینه کامل توسط پزشک متخصص",
  },
  {
    _id: "2",
    title: "نوبت دندانپزشکی",
    price: 300000,
    duration: 60,
    description: "ویزیت و بررسی دندان‌ها",
  },
  {
    _id: "3",
    title: "آزمایش خون",
    price: 200000,
    duration: 20,
    description: "انجام آزمایشات روتین خون",
  },
];

function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldData, setFieldData] = useState({});
  const onClose = () => setIsModalOpen(false);
  const editHandler = (id) => {
    setIsModalOpen(true);
    const targetService = mockServices.find((service) => service._id === id);
    setFieldData(targetService);
  };
  const deletHanlder = () => {};
  return (
    <>
      <div className="p-6 flex flex-col gap-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              خدمات
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              {mockServices.length} خدمت ثبت شده
            </p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
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
          {mockServices.map((service) => (
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
              <div className="flex items-start justify-between gap-2">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl
                bg-violet-100 dark:bg-violet-900/30
                text-violet-600 dark:text-violet-400 shrink-0"
                >
                  ✦
                </div>
                <div className="flex-1 text-right">
                  <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {service.title}
                  </h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* divider */}
              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              {/* info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {service.duration} دقیقه
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {service.price.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </div>

              {/* actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => editHandler(service._id)}
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
                  onClick={() => deletHanlder(service._id)}
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
          ))}
        </div>
      </div>
      <Modal
        title={"افزودن خدمت جدید"}
        fields={serviceFields}
        isOpen={isModalOpen}
        data={fieldData}
        onClose={onClose}
        onConfirm={() => {
          onClose();
        }}
      />
    </>
  );
}

export default ServicesPage;
