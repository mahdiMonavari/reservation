"use client";
import { useState } from "react";
import { FaCheck, FaClock, FaEye } from "react-icons/fa";
import { successToast, errorToast } from "@/components/modules/toast/toast";
import EmptyState from "@/components/modules/emptyState/EmptyState";

function TextModal({ text, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4 rounded-2xl
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          shadow-xl p-6 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
              transition-colors text-lg"
          >
            ✕
          </button>
          <p className="text-base font-Morabba-Bold text-slate-800 dark:text-slate-100">
            متن کامنت
          </p>
        </div>
        <p className="text-sm font-Dana-Medium text-slate-600 dark:text-slate-300 leading-7 text-right">
          {text}
        </p>
      </div>
    </div>
  );
}

function CommentsPage({ comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [selectedText, setSelectedText] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const handleVerify = async (id, current) => {
    try {
      setLoadingId(id);
      const res = await fetch(`/api/admin/comments/${id}`, {
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

  if (!comments.length) return <EmptyState title="کامنتی ثبت نشده" />;

  return (
    <>
      {selectedText && (
        <TextModal text={selectedText} onClose={() => setSelectedText(null)} />
      )}

      <div className="p-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400">
                  کاربر
                </th>
                <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                  متن
                </th>
                <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  تاریخ
                </th>
                <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400">
                  وضعیت
                </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-b border-slate-100 dark:border-slate-800
                    hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {/* کاربر */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg shrink-0
                          bg-violet-100 dark:bg-violet-900/30
                          text-violet-700 dark:text-violet-400
                          flex items-center justify-center text-xs font-Morabba-Bold"
                      >
                        {comment.userId?.firstName?.[0]}
                        {comment.userId?.lastName?.[0]}
                      </div>
                      <span className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                        {comment.userId?.firstName} {comment.userId?.lastName}
                      </span>
                    </div>
                  </td>

                  {/* متن */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex justify-center">
                      <button
                        onClick={() => setSelectedText(comment.text)}
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

                  {/* تاریخ */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div
                      className="text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 text-center"
                      dir="ltr"
                    >
                      {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                    </div>
                  </td>

                  {/* وضعیت */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          handleVerify(comment._id, comment.isVerified)
                        }
                        disabled={loadingId === comment._id}
                        title={comment.isVerified ? "لغو تایید" : "تایید کامنت"}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center
                          border transition-all duration-150
                          disabled:opacity-50 disabled:cursor-not-allowed
                          ${
                            comment.isVerified
                              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-amber-50 hover:text-amber-500 hover:border-amber-200 dark:hover:bg-amber-900/20 dark:hover:text-amber-400 dark:hover:border-amber-800"
                          }`}
                      >
                        {comment.isVerified ? (
                          <FaCheck size={13} />
                        ) : (
                          <FaClock size={13} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CommentsPage;
