import Image from "next/image";
import ReservationButton from "./ReservationButton";

function DoctorCard({
  userId,
  photo,
  specialty,
  about,
  experience,
  avgAppointmentTime,
  baseFee,
  commentCount,
}) {
  return (
    <section className="group relative overflow-hidden rounded-3xl border border-emerald-100/70 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-500 dark:border-emerald-900/30 dark:bg-slate-900/30 dark:shadow-none">
      {/* Background Gradient Decor */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-transparent to-teal-50/40 dark:from-emerald-950/20 dark:to-transparent" />

      <div className="relative flex flex-col md:flex-row gap-0 md:gap-6">
        {/* Doctor Image Section */}
        <div className="relative w-full md:w-72 lg:w-80 shrink-0">
          <Image
            alt="doctor image"
            src={photo}
            width={500}
            height={500}
            className="h-full w-full object-cover aspect-square md:rounded-l-3xl md:rounded-r-none rounded-t-3xl md:rounded-t-none"
          />
        </div>

        {/* Content Section */}
        <div className="relative flex-1 p-5 md:p-7 lg:p-8 text-emerald-900 dark:text-emerald-50 space-y-6">
          <div className="space-y-3">
            {/* Specialty - Highlighted as requested */}
            <div className="inline-block">
              <span className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-sm font-Morabba-Bold shadow-md shadow-emerald-200 dark:shadow-none">
                {specialty}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-Morabba-Bold tracking-tight text-emerald-950 dark:text-white">
              {userId?.firstName} {userId?.lastName}
            </h1>

            <p className="max-w-2xl text-sm md:text-base leading-7 font-Dana-Medium text-emerald-950/70 dark:text-emerald-50/70">
              {about}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Rating */}
            <div className="rounded-2xl border border-emerald-100 bg-white/70 p-3 dark:border-emerald-900/40 dark:bg-white/5">
              <p className="text-[10px] md:text-xs font-Dana-Medium text-emerald-700/70 dark:text-emerald-300/70">
                امتیاز
              </p>
              <p className="mt-1 font-Morabba-Bold text-lg">
                {new Intl.NumberFormat("fa-IR").format(5)}
              </p>
            </div>

            {/* Experience */}
            <div className="rounded-2xl border border-emerald-100 bg-white/70 p-3 dark:border-emerald-900/40 dark:bg-white/5">
              <p className="text-[10px] md:text-xs font-Dana-Medium text-emerald-700/70 dark:text-emerald-300/70">
                تجربه
              </p>
              <p className="mt-1 font-Morabba-Bold text-lg">
                {new Intl.NumberFormat("fa-IR").format(experience)}{" "}
                <span className="text-xs font-Dana-Medium">سال</span>
              </p>
            </div>

            {/* Reviews */}
            <div className="rounded-2xl border border-emerald-100 bg-white/70 p-3 dark:border-emerald-900/40 dark:bg-white/5">
              <p className="text-[10px] md:text-xs font-Dana-Medium text-emerald-700/70 dark:text-emerald-300/70">
                نظرات
              </p>
              <p className="mt-1 font-Morabba-Bold text-lg">
                {new Intl.NumberFormat("fa-IR").format(commentCount)}
              </p>
            </div>

            {/* Hidden on very small screens to keep layout clean, or shown as 4th item */}
            <div className="hidden sm:block rounded-2xl border border-emerald-100 bg-white/70 p-3 dark:border-emerald-900/40 dark:bg-white/5">
              <p className="text-[10px] md:text-xs font-Dana-Medium text-emerald-700/70 dark:text-emerald-300/70">
                وضعیت
              </p>
              <p className="mt-1 font-Morabba-Bold text-lg text-sm">فعال</p>
            </div>
          </div>

          {/* More info - Fees & Time */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50/70 px-4 py-3 dark:bg-emerald-950/25 border border-emerald-100/50">
              <p className="text-xs font-Dana-Medium text-emerald-700/70 dark:text-emerald-300/70">
                هزینه ویزیت
              </p>
              <p className="mt-1 font-Morabba-Bold text-base md:text-lg">
                {new Intl.NumberFormat("fa-IR").format(baseFee)}
                {"   "}
                <span className="text-xs font-Dana-Medium">تومان</span>
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50/70 px-4 py-3 dark:bg-emerald-950/25 border border-emerald-100/50">
              <p className="text-xs font-Dana-Medium text-emerald-700/70 dark:text-emerald-300/70">
                میانگین زمان نوبت
              </p>
              <p className="mt-1 font-Morabba-Bold text-base md:text-lg">
                {new Intl.NumberFormat("fa-IR").format(avgAppointmentTime)}
                <span className="text-xs font-Dana-Medium">دقیقه</span>
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <ReservationButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorCard;
