"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // نیاز به نصب react-icons دارید
import CommentModal from "./CommentModal";

function DoctorComment({ comments, doctorId }) {
  const [isNewCommentOpen, setIsNewCommentOpen] = useState(false);
  const onOpenNewComment = () => setIsNewCommentOpen(true);
  const onCloseNewComment = () => setIsNewCommentOpen(false);
  return (
    <>
      <CommentModal
        doctorId={doctorId}
        isNewCommentOpen={isNewCommentOpen}
        onCloseNewComment={onCloseNewComment}
      />
      <section className="container py-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-Morabba-Bold text-emerald-950 dark:text-white">
              نظرات مراجعین
            </h2>
            <p className="text-emerald-700/60 dark:text-emerald-400/60 font-Dana-Medium">
              تجربه‌های واقعی افرادی که از خدمات این پزشک استفاده کرده‌اند
            </p>
          </div>

          {/* میانگین امتیاز کلی (ایده‌ای برای زیبایی بیشتر) */}
          <div>
            <button
              onClick={onOpenNewComment}
              className="px-6 py-3 rounded-2xl border flex items-center gap-2
           border-emerald-200 dark:border-emerald-800 bg-white/50
            dark:bg-emerald-950/30 backdrop-blur-md hover:bg-emerald-50 dark:hover:bg-emerald-900/50 transition-all 
          duration-300 text-emerald-900 dark:text-emerald-100 font-Morabba-Bold text-base shadow-sm"
            >
              <span>ایجاد کامنت جدید</span>
              <span className="text-xl">+</span>
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="grid gap-6">
          {comments.map((item, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-[2rem] border border-emerald-100/60 bg-white/50 backdrop-blur-sm transition-all duration-300 
                       hover:bg-white/80 dark:hover:bg-slate-900/60 dark:border-emerald-900/30 dark:bg-slate-900/40 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                {/* User Avatar */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xl font-Morabba-Bold text-white shadow-lg shadow-emerald-200 dark:shadow-none">
                    {item.userId ? item.userId.firstName[0] : "ک"}
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  </div>
                </div>

                {/* Comment Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-Morabba-Bold text-emerald-950 dark:text-emerald-50 text-lg">
                        {item.userId
                          ? `${item.userId.firstName} ${item.userId.lastName}`
                          : "کاربر ناشناس"}
                      </h4>
                      {/* امتیاز تکی برای هر نظر */}
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-amber-400 text-[10px]">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <span className="text-[10px] font-Dana-Medium text-emerald-600/50">
                          امتیاز شما
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-Dana-Medium text-emerald-700/50 dark:text-emerald-400/50 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit">
                      {item.date}
                    </span>
                  </div>

                  <div className="relative">
                    <p className="text-sm md:text-base font-Dana-Medium text-emerald-900/80 dark:text-emerald-50/80 leading-relaxed">
                      {item.text}
                    </p>
                    {/* دکوراسیون ظریف برای بخش متن */}
                    <div className="absolute -left-2 top-0 bottom-0 w-[2px] bg-emerald-100 dark:bg-emerald-900/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default DoctorComment;
