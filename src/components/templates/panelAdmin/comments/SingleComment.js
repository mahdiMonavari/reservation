import React from "react";
import { FaCheck, FaClock, FaEye, FaRegCircle } from "react-icons/fa";
import { successToast, errorToast } from "@/components/modules/toast/toast";

function SingleComment({
  userId,
  doctorId,
  text,
  createdAt,
  hasAnswer,
  isVerified,
  _id,
  loadingId,
  setSelectedText,
  setLoadingId,
  answeredIds,
}) {
  const handleVerify = async (id, current) => {
    try {
      setLoadingId(id);
      const res = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: !current }),
      });
      if (res.status === 200) {
        const { data } = await res.json();
        setComments((prev) =>
          prev.map((c) =>
            c._id === data._id ? { ...c, isVerified: data.isVerified } : c
          )
        );
        successToast(data.isVerified ? "کامنت تایید شد" : "تایید لغو شد");
      } else {
        errorToast("خطایی پیش آمد");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <tr
      className="border-b border-slate-100 dark:border-slate-800
                    hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
    >
      <td className="sm:px-4 px-2 py-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
            {userId?.firstName} {userId?.lastName}
          </span>
        </div>
      </td>

      <td className="sm:px-4 px-2 py-3 hidden sm:table-cell">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
            {doctorId?.firstName} {doctorId?.lastName}
          </span>
        </div>
      </td>
      <td className="sm:px-4 px-2 py-3">
        <div className="flex justify-center">
          <button
            onClick={() => {
              setSelectedText({
                text: text,
                id: _id,
              });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-Morabba-Bold
                          text-slate-500 dark:text-slate-400
                          bg-slate-100 dark:bg-slate-800
                          hover:bg-violet-50 dark:hover:bg-violet-900/20
                          hover:text-violet-600 dark:hover:text-violet-400
                          border border-transparent hover:border-violet-200 dark:hover:border-violet-800
                          transition-all duration-150"
          >
            <FaEye size={11} />
            مشاهده
          </button>
        </div>
      </td>
      <td className="sm:px-4 px-2 py-3 hidden md:table-cell">
        <div
          className="text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 text-center"
          dir="ltr"
        >
          {new Date(createdAt).toLocaleDateString("fa-IR")}
        </div>
      </td>
      <td className="sm:px-4 px-2 py-3 hidden md:table-cell">
        <div
          className="text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 flex items-center justify-center"
          dir="ltr"
        >
          {hasAnswer || answeredIds.has(_id) ? (
            <FaCheck size={13} />
          ) : (
            <FaRegCircle size={13} />
          )}
        </div>
      </td>
      <td className="sm:px-4 px-2 py-3">
        <div className="flex justify-center">
          <button
            onClick={() => handleVerify(_id, isVerified)}
            disabled={loadingId === _id}
            title={isVerified ? "لغو تایید" : "تایید کامنت"}
            className={`w-9 h-9 rounded-lg flex items-center justify-center
                          border transition-all duration-150
                          disabled:opacity-50 disabled:cursor-not-allowed
                          ${
                            isVerified
                              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                              : "bg-amber-50 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-300 dark:hover:border-amber-700"
                          }`}
          >
            {isVerified ? <FaCheck size={13} /> : <FaClock size={13} />}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default SingleComment;
