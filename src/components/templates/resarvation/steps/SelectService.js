"use client"
import useReservationStore from '@/store/reservationStore'
import { FiCheck, FiClock, FiDollarSign } from 'react-icons/fi'

const SERVICES = [
  { id: 1, name: 'سونوگرافی عادی',         duration: '۳۰ دقیقه', price: '۳۵۰,۰۰۰' },
  { id: 2, name: 'سونوگرافی سه‌بعدی',      duration: '۴۵ دقیقه', price: '۶۵۰,۰۰۰' },
  { id: 3, name: 'آمنیوسنتز',              duration: '۶۰ دقیقه', price: '۱,۲۰۰,۰۰۰' },
  { id: 4, name: 'ویزیت متخصص',            duration: '۲۰ دقیقه', price: '۲۸۰,۰۰۰' },
  { id: 5, name: 'CTG (مانیتورینگ جنین)',  duration: '۴۵ دقیقه', price: '۴۵۰,۰۰۰' },
  { id: 6, name: 'مشاوره بارداری',         duration: '۳۰ دقیقه', price: '۳۰۰,۰۰۰' },
]

function SelectService() {
  const selectedServices = useReservationStore(s => s.selectedServices)
  const setServices      = useReservationStore(s => s.setServices)

  const toggle = (service) => {
    const exists = selectedServices.find(s => s.id === service.id)
    if (exists) {
      setServices(selectedServices.filter(s => s.id !== service.id))
    } else {
      setServices([...selectedServices, service])
    }
  }

  const isSelected = (id) => !!selectedServices.find(s => s.id === id)

  
const toEnglishDigits = (str) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[۰-۹]/g, (char) => persianDigits.indexOf(char));
};

// محاسبه مجموع قیمت
const totalPrice = selectedServices.reduce((sum, s) => {
  const price = parseInt(toEnglishDigits(s.price).replace(/,/g, ''), 10);
  return sum + (isNaN(price) ? 0 : price);
}, 0);

// محاسبه مجموع زمان
const totalDuration = selectedServices.reduce((sum, s) => {
  const duration = parseInt(toEnglishDigits(s.duration), 10);
  return sum + (isNaN(duration) ? 0 : duration);
}, 0);


  return (
    <div>
      <div className="text-right mb-5">
        <h2 className="text-xl mt-3 md:text-2xl font-Morabba-Bold
          text-emerald-900 dark:text-white">
          خدمات مورد نظر خود را انتخاب کنید
        </h2>
        <p className="text-sm mt-1 text-emerald-600 dark:text-emerald-400">
          می‌توانید چند خدمت را همزمان انتخاب کنید
        </p>
      </div>

      {/* لیست سرویس‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        {SERVICES.map(service => {
          const selected = isSelected(service.id)
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => toggle(service)}
              className={`relative w-full text-right rounded-2xl px-4 py-3.5
                flex items-start gap-3
                border transition-all duration-200 group
                ${selected
                  ? 'bg-emerald-50 border-emerald-400 dark:bg-emerald-500/15 dark:border-emerald-400'
                  : 'bg-white/60 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/50 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/10'
                }`}
            >
              {/* چک‌باکس */}
              <div className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center
                border-2 transition-all duration-200
                ${selected
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-emerald-200 dark:border-white/20 group-hover:border-emerald-400 dark:group-hover:border-white/40'
                }`}>
                {selected && <FiCheck size={11} className="text-white" strokeWidth={3} />}
              </div>

              {/* اطلاعات */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-Morabba-Bold truncate transition-colors duration-200
                  ${selected
                    ? 'text-emerald-800 dark:text-emerald-200'
                    : 'text-emerald-900 dark:text-white/80'
                  }`}>
                  {service.name}
                </p>
                <div className="flex items-center justify-end gap-3 mt-5">
                  <span className="flex items-center gap-1 text-xs
                    text-emerald-500 dark:text-emerald-400/60">
                    <FiClock size={10} />
                    {service.duration}
                  </span>
                  <span className="flex items-center gap-1 text-sm
                    text-emerald-600 dark:text-emerald-400 font-Morabba-Bold">
                    <FiDollarSign size={10} />
                    {service.price} تومان
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* خلاصه انتخاب‌ها */}
      <div className={`transition-all duration-1000 rounded-2xl overflow-hidden
        ${selectedServices.length > 0 ? 'md:max-h-30 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-emerald-500/10 dark:bg-emerald-500/10
          border border-emerald-300/50 dark:border-emerald-400/20
          rounded-2xl px-5 py-3">
          <div className="flex items-center justify-between">

            {/* تعداد و زمان کل */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs
                text-emerald-600 dark:text-emerald-400">
                <FiClock size={12} />
                {totalDuration} دقیقه
              </span>
              <span className="w-px h-3 bg-emerald-300 dark:bg-emerald-600" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                {selectedServices.length} خدمت
              </span>
            </div>

            {/* قیمت کل */}
            <div className="text-right">
              <p className="text-[10px] text-emerald-500 dark:text-emerald-400/60 mb-0.5">
                جمع کل
              </p>
              <p className="text-sm font-Morabba-Bold
                text-emerald-700 dark:text-emerald-300">
                {totalPrice.toLocaleString('fa-IR')} تومان
              </p>
            </div>
          </div>

          {/* تگ‌های انتخاب‌شده */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {selectedServices.map(s => (
              <span key={s.id}
                className="text-[11px] px-2.5 py-1 rounded-full
                  bg-emerald-100 text-emerald-700
                  dark:bg-emerald-500/20 dark:text-emerald-300
                  border border-emerald-200 dark:border-emerald-500/30">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectService