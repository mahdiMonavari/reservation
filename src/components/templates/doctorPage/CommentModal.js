import { errorToast, successToast } from "@/components/modules/toast/toast";
import React, { useState } from "react";

function CommentModal({
  isNewCommentOpen,
  onCloseNewComment,
  doctorId,
  userId,
  parentId = null,
}) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      doctorId,
      parentId,
      text,
      userId,
      isVerified: false,
      hasAnswer: false,
    };
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (res.status === 201) {
      // اصلاح این بخش
      successToast("کامنت شما ثبت گردید");
      setText(""); // فقط در صورت موفقیت متن پاک شود
      onCloseNewComment();
    } else {
      errorToast("برای ثبت نظر ابتدا وارد شوید");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isNewCommentOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* ✅ بک‌دراپ تیره - حالا با تغییر Opacity به نرمی ظاهر می‌شود */}
      <div
        onClick={onCloseNewComment}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isNewCommentOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl transition-all duration-300 ${
          isNewCommentOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-Morabba-Bold text-emerald-950 dark:text-white">
            {parentId ? "پاسخ به نظر" : "ثبت نظر جدید"}
          </h3>
          <button
            onClick={onCloseNewComment}
            className="text-emerald-400 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 dark:text-gray-100 dark:placeholder:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-Dana-Medium transition-all"
            placeholder="متن نظر خود را بنویسید..."
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-Morabba-Bold transition-all active:scale-95 shadow-lg shadow-emerald-200 dark:shadow-none"
          >
            ارسال نظر
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;
