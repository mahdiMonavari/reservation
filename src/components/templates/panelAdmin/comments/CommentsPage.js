"use client";
import { useEffect, useState } from "react";
import { FaCheck, FaClock, FaEye, FaRegCircle } from "react-icons/fa";
import { successToast, errorToast } from "@/components/modules/toast/toast";
import EmptyState from "@/components/modules/emptyState/EmptyState";
import TextModal from "./TextModal";
import SearchInput from "@/components/modules/admin/Search";
import Pagination from "@/components/modules/pagination/Pagination";

function CommentsPage({ commentsList, totalPage, commentsCount, currentPage }) {
  const [comments, setComments] = useState(commentsList);
  const [selectedText, setSelectedText] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [answeredIds, setAnsweredIds] = useState(new Set());
  useEffect(() => {
    setComments(commentsList);
  }, [commentsList]);

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

  if (!comments.length) return <EmptyState title="کامنتی ثبت نشده" />;

  return (
    <>
      {selectedText && (
        <TextModal
          text={selectedText.text}
          id={selectedText.id}
          onClose={() => setSelectedText(null)}
          setAnsweredIds={setAnsweredIds}
        />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100">
              لیست کامنتها
            </h1>
            <p className="text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 mt-0.5">
              <span className="text-violet-500 block mt-2 dark:text-violet-400 font-Morabba-Bold">
                {commentsCount} کامنت در سایت موجود است
              </span>
            </p>
          </div>
          <SearchInput />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="sm:px-4 px-2 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400">
                  کاربر
                </th>
                <th className="sm:px-4 px-2 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                  دکتر
                </th>
                <th className="sm:px-4 px-2 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400">
                  متن
                </th>
                <th className="sm:px-4 px-2 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  تاریخ
                </th>
                <th className="sm:px-4 px-2 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  دارای پاسخ
                </th>
                <th className="sm:px-4 px-2 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400">
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
                  <td className="sm:px-4 px-2 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                        {comment.userId?.firstName} {comment.userId?.lastName}
                      </span>
                    </div>
                  </td>

                  <td className="sm:px-4 px-2 py-3 hidden sm:table-cell">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                        {comment.doctorId?.firstName}{" "}
                        {comment.doctorId?.lastName}
                      </span>
                    </div>
                  </td>

                  {/* متن */}
                  <td className="sm:px-4 px-2 py-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setSelectedText({
                            text: comment.text,
                            id: comment._id,
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

                  {/* تاریخ */}
                  <td className="sm:px-4 px-2 py-3 hidden md:table-cell">
                    <div
                      className="text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 text-center"
                      dir="ltr"
                    >
                      {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                    </div>
                  </td>
                  <td className="sm:px-4 px-2 py-3 hidden md:table-cell">
                    <div
                      className="text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 flex items-center justify-center"
                      dir="ltr"
                    >
                      {comment.hasAnswer || answeredIds.has(comment._id) ? (
                        <FaCheck size={13} />
                      ) : (
                        <FaRegCircle size={13} />
                      )}
                    </div>
                  </td>
                  {/* وضعیت */}
                  <td className="sm:px-4 px-2 py-3">
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
                              : "bg-amber-50 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-300 dark:hover:border-amber-700"
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
      <Pagination totalPages={totalPage} currentPage={currentPage} />
    </>
  );
}

export default CommentsPage;
