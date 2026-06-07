import React from 'react'
import CommentSlide from '../commentSlide/CommentSlide'

function CommentSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 px-4">
      
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full
        bg-emerald-300/20 dark:bg-emerald-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full
        bg-emerald-200/30 dark:bg-emerald-800/30 blur-2xl" />

      <div className="relative container max-w-6xl mx-auto flex flex-col-reverse lg:flex-row
        items-center justify-center gap-12 lg:gap-20">

        {/* ── Stacked card + slider ── */}
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-none lg:w-auto flex-shrink-0"
          data-aos="fade-left">
          <div className="relative w-full sm:w-96 lg:w-120 h-36 sm:h-36 mx-auto">
            {/* Shadow cards */}
            <div className="absolute inset-0 dark:bg-zinc-600 bg-gray-300
              rounded-xl -rotate-6 transition-transform duration-500
              group-hover:-rotate-9" />
            <div className="absolute inset-0 dark:bg-zinc-700 bg-gray-200
              rounded-xl -rotate-3 transition-transform duration-500" />
            {/* Main card */}
            <div className="absolute inset-0 dark:bg-zinc-900 bg-white rounded-xl
              shadow-xl shadow-emerald-900/10 dark:shadow-emerald-400/5
              rotate-0 z-10 p-5 flex items-center
              border border-emerald-100 dark:border-emerald-900/50
              transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="w-full">
                <CommentSlide />
              </div>
            </div>
          </div>
        </div>

        {/* ── Text side ── */}
        <div className="text-right w-full lg:max-w-sm" data-aos="fade-right">
          {/* Eyebrow */}
          <div className="flex items-center justify-end gap-2 mb-3">
            <span className="text-sm dark:text-emerald-400 text-emerald-700/70 tracking-wide">
              رضایت شما اعتبار ماست
            </span>
            <span className="inline-block w-14 h-px dark:bg-emerald-400 bg-emerald-700/50 rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-shabnam-bold leading-snug
            text-emerald-900 dark:text-gray-50 mb-5">
            نظر مراجعه‌کنندگان ما
          </h2>

          {/* Accent divider */}
          <div className="flex items-center justify-end gap-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="w-6 h-px bg-emerald-400 rounded-full" />
            <span className="w-10 h-0.5 bg-emerald-500 rounded-full" />
          </div>

          {/* Body text */}
          <div className="space-y-3 text-base sm:text-lg text-justify">
            <p className="text-emerald-800/70 dark:text-gray-300 leading-relaxed">
              در این بخش می‌توانید تجربه‌های واقعی مراجعه‌کنندگانی را بخوانید که مراقبت‌های خود را در کلینیک ما گذراندند.
            </p>
            <p className="text-emerald-800/70 dark:text-gray-300 leading-relaxed">
              این نظرات نشان‌دهنده کیفیت خدمات، عملکرد متخصصین، و میزان رضایت بیماران است.
            </p>
          </div>

          {/* Decorative quote mark */}
          <div className="mt-6 flex justify-end">
            <span className="text-6xl leading-none text-emerald-200 dark:text-emerald-800/60
              font-serif select-none">
              ❝
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CommentSection