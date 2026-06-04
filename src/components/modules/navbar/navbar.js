import React from 'react'
import ThemeCta from './ThemeCta';

function Navbar({theme}) {
  return (
    <div className="fixed top-5 px-8 py-4 bg-green-100/50 dark:bg-teal-800/70 hidden
     rounded-full sm:w-160 md:w-192 lg:w-256 xl:w-320 w-[90%]  left-1/2 -translate-x-1/2 sm:flex border-l-2 border-green-300 border-r-2
    items-center justify-between z-50 overflow-hidden">
      {/* <span className='w-25 h-px bg-green-300 absolute top-0 right-3 rounded-3xl'></span> */}
    <ul className="flex items-center gap-x-6 text-green-800/80 font-Morabba-Bold  *:cursor-pointer text-xl">
        <li className='text-green-800/80 hover:text-green-800 transition-all dark:text-teal-950 dark:hover:text-teal-500 duration-300'>خانه</li>
        <li className='text-green-800/80 hover:text-green-800 transition-all dark:text-teal-950 dark:hover:text-teal-500 duration-300'>درباره ما</li>
        <li className='text-green-800/80 hover:text-green-800 transition-all dark:text-teal-950 dark:hover:text-teal-500 duration-300'>ارتباط با ما</li>
        <li className='text-green-800/80 hover:text-green-800 transition-all dark:text-teal-950 dark:hover:text-teal-500 duration-300'>دکترها</li>
        <li className='text-green-800/80 hover:text-green-800 transition-all dark:text-teal-950 dark:hover:text-teal-500 duration-300'>رزرو نوبت</li>
    </ul>
     <ul className="flex items-center gap-x-4 text-green-800/80 font-Morabba-Bold  *:cursor-pointer text-xl
     dark:text-teal-950">        
        <li className='flex items-center gap-2 dark:hover:text-teal-500
        hover:text-green-800 transition-all duration-300 group'>
            <span>
                ورود
            </span>
            <span className='h-9 rounded-full w-0.5 bg-green-800/80 dark:bg-teal-950
            group-hover:bg-green-800 transition-all duration-300 dark:group-hover:bg-teal-500'></span>
            <span>
                ثبت نام
            </span>
        </li>
        <ThemeCta prevTheme={theme}/>
      </ul>
    </div>
  )
}

export default Navbar