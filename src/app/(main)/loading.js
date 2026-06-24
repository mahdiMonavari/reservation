export default function Loading() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white dark:from-slate-900 dark:to-slate-950"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-8">
        {/* هدر لودینگ */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-500 animate-spin" />
          <span className="font-Morabba-Bold text-2xl text-slate-400 dark:text-slate-500">
            در حال بارگذاری...
          </span>
        </div>

        {/* گرید اسکلتون کارت دکترها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-emerald-100/70 dark:border-emerald-800/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md overflow-hidden animate-pulse"
            >
              {/* تصویر اسکلتون */}
              <div className="h-48 bg-slate-200 dark:bg-slate-800" />

              {/* محتوای اسکلتون */}
              <div className="p-5 flex flex-col gap-4">
                {/* نام */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="h-5 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                  <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>

                {/* مدرک تحصیلی */}
                <div className="flex items-center gap-3 bg-emerald-50/60 dark:bg-emerald-900/10 rounded-xl px-4 py-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-36 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>

                {/* زمینه فعالیت */}
                <div className="flex items-start gap-3 bg-emerald-50/60 dark:bg-emerald-900/10 rounded-xl px-4 py-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>

                {/* درباره متخصص */}
                <div className="space-y-2 pt-2 border-t border-emerald-100/60 dark:border-emerald-800/30">
                  <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>

                {/* دکمه */}
                <div className="h-11 bg-slate-200 dark:bg-slate-700 rounded-xl mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
