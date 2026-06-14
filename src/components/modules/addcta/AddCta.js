"use client";

import { useState } from "react";
import Modal from "../modal/Modal";

function AddCta({ title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => setIsModalOpen(false);
  return (
    <button
      onClick={() => {
        setIsModalOpen(true);
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
      <Modal
        isOpen={true}
        onClose={onClose}
        onConfirm={() => {
          onClose();
        }}
      />
      {title}
    </button>
  );
}

export default AddCta;
