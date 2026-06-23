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
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl
                border border-emerald-200 dark:border-emerald-800
                bg-white/50 dark:bg-emerald-950/30
                hover:bg-emerald-50 dark:hover:bg-emerald-900/50
                backdrop-blur-md transition-all duration-300
                text-emerald-900 dark:text-emerald-100
                font-Morabba-Bold text-sm shadow-sm"
            >
              ثبت نظر
              <span
                className="w-5 h-5 rounded-full bg-emerald-500 text-white
                flex items-center justify-center text-base leading-none"
              >
                +
              </span>
            </button>
          )}
        </div>

        {/* list */}
        {mainComments.length ? (
          <div className="grid gap-4">
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
