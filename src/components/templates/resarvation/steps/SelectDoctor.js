"use client"
import useReservationStore from '@/store/reservationStore'
import Image from 'next/image'
import { FiCheck } from 'react-icons/fi'

const DOCTORS = [
  {
    id: 1,
    name:       'دکتر سارا محمدی',
    specialty:  'متخصص زنان و زایمان',
    experience: '۱۵ سال سابقه',
    rating:     '۴.۹',
    src:        '/img/doctor-hero.jpg',
  },
  {
    id: 2,
    name:       'دکتر نیلوفر رضایی',
    specialty:  'فوق تخصص جنین‌شناسی',
    experience: '۱۲ سال سابقه',
    rating:     '۴.۸',
    src:        '/img/doctor-hero.jpg',
  },
  {
    id: 3,
    name:       'دکتر مریم کریمی',
    specialty:  'متخصص زنان و نازایی',
    experience: '۱۰ سال سابقه',
    rating:     '۴.۷',
    src:        '/img/doctor-hero.jpg',
  },
  {
    id: 4,
    name:       'دکتر فاطمه حسینی',
    specialty:  'متخصص سونوگرافی مامایی',
    experience: '۸ سال سابقه',
    rating:     '۴.۸',
    src:        '/img/doctor-hero.jpg',
  },
]

function SelectDoctor() {
  const selectedDoctor = useReservationStore(s => s.selectedDoctor)
  const setDoctor      = useReservationStore(s => s.setDoctor)

  return (
    <div>
      <div className="text-right mb-5">
        <h2 className="text-base font-Morabba-Bold
          text-emerald-900 dark:text-white">
          دکتر مورد نظر خود را انتخاب کنید
        </h2>
        <p className="text-xs mt-1 text-emerald-600/60 dark:text-emerald-300/50">
          با کلیک روی هر کارت، دکتر انتخاب می‌شود
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DOCTORS.map(doctor => {
          const isSelected = selectedDoctor?.id === doctor.id
          return (
            <button
              key={doctor.id}
              type="button"
              onClick={() => setDoctor(doctor)}
              className={`relative w-full text-right rounded-2xl p-4
                flex items-center gap-4
                border transition-all duration-250 group
                ${isSelected
                  ? 'bg-emerald-50 border-emerald-400 dark:bg-emerald-500/15 dark:border-emerald-400'
                  : 'bg-white/60 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/60 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/10'
                }`}
            >
              {/* عکس */}
              <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden
                border-2 transition-colors duration-250
                border-emerald-100 dark:border-white/10
                group-hover:border-emerald-300 dark:group-hover:border-white/20">
                <Image
                  src={doctor.src}
                  alt={doctor.name}
                  className="object-cover"
                  fill
                />
              </div>

              {/* اطلاعات */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-Morabba-Bold truncate
                  text-emerald-900 dark:text-white">
                  {doctor.name}
                </p>
                <p className="text-xs mt-0.5 truncate
                  text-emerald-600/70 dark:text-emerald-300/60">
                  {doctor.specialty}
                </p>
                <div className="flex items-center justify-end gap-3 mt-1.5">
                  <span className="text-[11px] text-emerald-500/70 dark:text-emerald-400/50">
                    {doctor.experience}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]
                    text-amber-500 dark:text-amber-400">
                    ★ {doctor.rating}
                  </span>
                </div>
              </div>

              {/* تیک انتخاب */}
              <div className={`absolute top-3 left-3 w-5 h-5 rounded-full
                flex items-center justify-center
                transition-all duration-250
                ${isSelected
                  ? 'bg-emerald-500 opacity-100 scale-100'
                  : 'bg-emerald-100 dark:bg-white/10 opacity-0 scale-75 group-hover:opacity-60 group-hover:scale-90'
                }`}>
                <FiCheck size={11} className="text-white" strokeWidth={3} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SelectDoctor