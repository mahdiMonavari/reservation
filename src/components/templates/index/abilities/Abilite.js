"use client"
import clsx from 'clsx'
import { FaChevronLeft } from "react-icons/fa";

function Abilite({title , description}) {

  return (
    <>
<div className={clsx(`group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white/60
 p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xs dark:hover:shadow-emerald-950/30
  hover:shadow-emerald-100/50 backdrop-blur-md  dark:border-emerald-900/30
   dark:bg-slate-900/20 dark:shadow-none dark:backdrop-blur-lg`)}>
  
  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-500/50 transition-all group-hover:scale-150 
              dark:bg-emerald-500/20"></div>

  <div className="relative mb-3">
    <h3 className="font-bold text-emerald-900 transition-colors group-hover:text-emerald-600 font-Morabba-Medium 
                dark:text-emerald-50 dark:group-hover:text-emerald-400 text-4xl">
        {title}
    </h3>
  
    <div className="mt-1 h-1 w-10 rounded-full bg-emerald-400 transition-all duration-300 group-hover:w-16 
                dark:bg-emerald-500/50"></div>
  </div>

  <p className="relative text-lg leading-relaxed text-emerald-800/70 font-shabnam-medium h-25
            dark:text-emerald-100/60">
    {description}
  </p>

  <div className="relative mt-5 flex items-center text-xs font-semibold text-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 
              dark:text-emerald-400">
    مشاهده جزئیات
    <FaChevronLeft />    
  </div>
</div>


    </>
  )
}

export default Abilite