"use client";
import React, { useState } from "react";
import { FaCommentSlash } from "react-icons/fa";
import CommentModal from "./CommentModal";
import CommentCard from "./CommentCard";

function DoctorComment({ comments, doctorId, isUserLogin, answerComments }) {
  const [isNewCommentOpen, setIsNewCommentOpen] = useState(false);

  // کامنتهای اصلی + جواب‌هاشون رو ضمیمه میکنیم
  const mainComments = comments
    .filter((c) => !c.parentId)
    .map((c) => ({
      ...c,
      answers:
        answerComments?.filter((a) => String(a.parentId) === String(c._id)) ||
        [],
    }));

  return (
    <>
      {isUserLogin && (
        <CommentModal
          doctorId={doctorId}
          isNewCommentOpen={isNewCommentOpen}
          onCloseNewComment={() => setIsNewCommentOpen(false)}
          userId={isUserLogin._id}
        />
      )}

      <section className="container py-16">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-1.5">
            <h2
              className="text-3xl md:text-4xl font-Morabba-Bold
              text-emerald-950 dark:text-white"
            >
              نظرات مراجعین
            </h2>
            <p
              className="text-sm font-Dana-Medium
              text-emerald-700/60 dark:text-emerald-400/60"
            >
              تجربه‌های واقعی افرادی که از خدمات این پزشک استفاده کرده‌اند
            </p>
          </div>

          {isUserLogin && (
            <button
              onClick={() => setIsNewCommentOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all duration-300 shadow-lg shadow-emerald-200 dark:shadow-none text-white font-Morabba-Bold text-base"
            >
              <span className="text-xl">+</span>
              <span>ایجاد کامنت جدید</span>
            </button>
          )}
        </div>

        {/* list */}
        {mainComments.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {mainComments.map((item) => (
              <CommentCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <div
              className="w-14 h-14 rounded-2xl
              bg-emerald-100 dark:bg-emerald-900/20
              text-emerald-400 flex items-center justify-center"
            >
              <FaCommentSlash size={22} />
            </div>
            <p
              className="text-sm font-Dana-Medium
              text-emerald-700/60 dark:text-emerald-400/60"
            >
              هنوز نظری ثبت نشده است
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default DoctorComment;
