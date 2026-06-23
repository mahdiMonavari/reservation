import React from "react";
import CommentSlide from "../commentSlide/CommentSlide";
import commentModel from "../../../../../model/comment";

async function CommentSection() {
  const comments = await commentModel
    .find({ isVerified: true, parentId: null })
    .populate("userId")
    .populate("doctorId")
    .lean();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 px-4">
      {/* blobs */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full
        bg-emerald-300/20 dark:bg-emerald-700/20 blur-3xl"
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full
        bg-emerald-200/30 dark:bg-emerald-800/30 blur-2xl"
      />

      <div
        className="relative container max-w-6xl mx-auto
        flex flex-col-reverse lg:flex-row
        items-center justify-center gap-12 lg:gap-20"
      >
        {/* ── slider ── */}
        <div
          className="w-full max-w-sm sm:max-w-md lg:w-auto shrink-0"
          data-aos="fade-left"
        >
          <div className="relative w-full sm:w-96 lg:w-[30rem] mx-auto">
            {/* shadow cards */}
            <div className="absolute inset-0 bg-gray-300 dark:bg-zinc-600 rounded-xl -rotate-6" />
            <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded-xl -rotate-3" />

            {/* main card */}
            <div
              className="relative z-10 bg-gray-100 dark:bg-zinc-800 rounded-xl
              border border-emerald-100 dark:border-emerald-900/50
              shadow-xl shadow-emerald-900/10 dark:shadow-emerald-400/5
              hover:shadow-2xl hover:shadow-emerald-500/10
              transition-all duration-300 p-5"
            >
              <CommentSlide comments={JSON.parse(JSON.stringify(comments))} />
            </div>
          </div>
        </div>

        {/* ── text ── */}
        <div className="text-right w-full lg:max-w-sm" data-aos="fade-right">
          <div className="flex items-center justify-end gap-2 mb-3">
            <span className="text-sm text-emerald-700/70 dark:text-emerald-400 tracking-wide">
              رضایت شما اعتبار ماست
            </span>
            <span className="w-14 h-px bg-emerald-700/50 dark:bg-emerald-400 rounded-full" />
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-shabnam-bold leading-snug
            text-emerald-900 dark:text-gray-50 mb-5"
          >
            نظر مراجعه‌کنندگان ما
          </h2>

          <div className="flex items-center justify-end gap-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="w-6 h-px bg-emerald-400 rounded-full" />
            <span className="w-10 h-0.5 bg-emerald-500 rounded-full" />
          </div>

          <div className="space-y-3 text-base sm:text-lg text-justify">
            <p className="text-emerald-800/70 dark:text-gray-300 leading-relaxed">
              در این بخش می‌توانید تجربه‌های واقعی مراجعه‌کنندگانی را بخوانید که
              مراقبت‌های خود را در کلینیک ما گذراندند.
            </p>
            <p className="text-emerald-800/70 dark:text-gray-300 leading-relaxed">
              این نظرات نشان‌دهنده کیفیت خدمات، عملکرد متخصصین، و میزان رضایت
              بیماران است.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <span
              className="text-6xl leading-none font-serif select-none
              text-emerald-200 dark:text-emerald-800/60"
            >
              ❝
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentSection;
