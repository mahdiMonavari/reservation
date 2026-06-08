import Image from 'next/image'
import ReservationButton from './ReservationButton'

function DoctorDard() {
  return (
    <section className='group relative overflow-hidden rounded-3xl border border-emerald-100/70 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-500 dark:border-emerald-900/30 dark:bg-slate-900/30 dark:shadow-none'>        
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-transparent to-teal-50/40 dark:from-emerald-950/20 dark:to-transparent' />      
        <div className='relative flex flex-col md:flex-row gap-0 md:gap-6'>
          <div className='relative w-full md:w-72 lg:w-80 shrink-0'>
            <Image
              alt='doctor image'
              src={"/img/doctor-hero.jpg"}
              width={500}
              height={500}
              className='h-full w-full object-cover aspect-square md:rounded-l-3xl md:rounded-r-none rounded-t-3xl md:rounded-t-none'
            />
          </div>

          <div className='relative flex-1 p-5 md:p-7 lg:p-8 text-emerald-900 dark:text-emerald-50 space-y-5'>
            
            <div className='space-y-2'>
              <div className='inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'>
                کارشناس مامایی             
              </div>

              <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
                مینا شبانی
              </h1>

              <p className='max-w-2xl text-sm md:text-base leading-7 text-emerald-950/70 dark:text-emerald-50/70'>
                توضیحات فیک. اینجا می‌تونی یک معرفی کوتاه و حرفه‌ای از پزشک بنویسی تا کاربر سریع بفهمد این شخص در چه زمینه‌ای فعالیت می‌کند.
              </p>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
              <div className='rounded-2xl border border-emerald-100 bg-white/70 p-3 dark:border-emerald-900/40 dark:bg-white/5'>
                <p className='text-xs text-emerald-700/70 dark:text-emerald-300/70'>امتیاز</p>
                <p className='mt-1 font-bold'>4.8/5</p>
              </div>
              <div className='rounded-2xl border border-emerald-100 bg-white/70 p-3 dark:border-emerald-900/40 dark:bg-white/5'>
                <p className='text-xs text-emerald-700/70 dark:text-emerald-300/70'>تجربه</p>
                <p className='mt-1 font-bold'>12 سال</p>
              </div>
              <div className='rounded-2xl border border-emerald-100 bg-white/70 p-3 dark:border-emerald-900/40 dark:bg-white/5'>
                <p className='text-xs text-emerald-700/70 dark:text-emerald-300/70'>نظرات</p>
                <p className='mt-1 font-bold'>128 نظر</p>
              </div>
              <div className='rounded-2xl border border-emerald-100 bg-white/70 p-3 dark:border-emerald-900/40 dark:bg-white/5'>
                <p className='text-xs text-emerald-700/70 dark:text-emerald-300/70'>وضعیت</p>
                <p className='mt-1 font-bold text-emerald-600 dark:text-emerald-400'>فعال</p>
              </div>
            </div>

            {/* More info */}
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl bg-emerald-50/70 px-4 py-3 dark:bg-emerald-950/25'>
                <p className='text-xs text-emerald-700/70 dark:text-emerald-300/70'>محل فعالیت</p>
                <p className='mt-1 font-medium'>تهران، کلینیک سلامت</p>
              </div>
              <div className='rounded-2xl bg-emerald-50/70 px-4 py-3 dark:bg-emerald-950/25'>
                <p className='text-xs text-emerald-700/70 dark:text-emerald-300/70'>زمان پاسخ‌گویی</p>
                <p className='mt-1 font-medium'>کمتر از 30 دقیقه</p>
              </div>
            </div>

            {/* CTA */}
            <div className='flex flex-col sm:flex-row gap-3 pt-2'>
              <ReservationButton/>
            </div>
          </div>
        </div>
      </section>
  )
}

export default DoctorDard