import Link from 'next/link'
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'

function DoctorService({service , index}) {
  return (
       <div key={index} className="p-6 rounded-3xl border border-emerald-100 bg-white/50 backdrop-blur-sm transition-all hover:shadow-lg dark:border-emerald-900/50 dark:bg-slate-900/40">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center text-2xl justify-center mb-4 text-emerald-600 dark:text-emerald-400 font-bold">
              {new Intl.NumberFormat("fa-IR").format(index+1)}
          </div>
          <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-50 mb-2">{service.title}</h3>
          <p className="text-sm text-emerald-950/70 dark:text-emerald-50/70 leading-relaxed">{service.desc}</p>
          <div className='flex justify-end mt-2'>
            <Link href={"/reservation"} className='flex items-center gap-2 cursor-pointer text-emerald-400 hover:text-emerald-900 transition-colors text-lg'>
                <span>
                    رزرو نوبت
                </span>
                <span>
                    <FaChevronLeft/>
                </span>
            </Link>
          </div>
        </div>
  )
}

export default DoctorService