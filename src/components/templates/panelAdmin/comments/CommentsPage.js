"use client";
import { useEffect, useState } from "react";
import EmptyState from "@/components/modules/emptyState/EmptyState";
import TextModal from "./TextModal";
import SearchInput from "@/components/modules/admin/Search";
import Pagination from "@/components/modules/pagination/Pagination";
import SingleComment from "./SingleComment";

function CommentsPage({ commentsList, totalPage, commentsCount, currentPage }) {
  const [comments, setComments] = useState(commentsList);
  const [selectedText, setSelectedText] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [answeredIds, setAnsweredIds] = useState(new Set());
  useEffect(() => {
    setComments(commentsList);
  }, [commentsList]);

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
        <div className="flex items-center flex-col md:flex-row gap-3 justify-between mb-6">
          <div>
            <h1 className="text-2xl font-Morabba-Bold text-center md:text-start text-slate-800 dark:text-slate-100">
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
                <SingleComment
                  {...comment}
                  key={comment._id}
                  loadingId={loadingId}
                  setLoadingId={setLoadingId}
                  answeredIds={answeredIds}
                  setSelectedText={setSelectedText}
                />
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
