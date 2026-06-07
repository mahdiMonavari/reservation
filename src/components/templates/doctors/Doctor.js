import Image from 'next/image'
import React from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import Link from 'next/link';

function Doctor() {
  return (
    <div className='group relative overflow-hidden rounded-xl border border-emerald-100 bg-white/60
  shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xs dark:hover:shadow-emerald-950/30
  hover:shadow-emerald-100/50 backdrop-blur-md  dark:border-emerald-900/30
   dark:bg-slate-900/20 dark:shadow-none dark:backdrop-blur-lg'>
    <Image
        alt='image'
        src={"/img/doctor-hero.jpg"}
        className='w-full aspect-square object-cover block'
        width={500}
        height={500}
    />
    <div className='p-4 text-emerald-900 space-y-2 dark:text-emerald-50'>
        <Link href={"/doctors/id"}>
            <h2 className='flex items-center gap-2 font-shabnam-bold text-lg cursor-pointer'>
                <FaUserDoctor/>
                <span>
                    نام متخصص : مینا شبانی  
                </span>                
            </h2>
        </Link>
        <h3 className='flex items-center gap-2 font-shabnam-bold text-lg'>
            <FaClipboardList />
            <span>
                زمینه فعالیت : مامایی
            </span>            
        </h3>
        <p className='line-clamp-2 flex flex-col gap-1'>
            <span className='flex items-center gap-2 font-shabnam-bold text-lg'>
                <MdOutlineDescription/>
                توضیحات کوتاه :
            </span>            
            خانم شبانی کارشناس مامایی با فعالیت 30 سال در این زمینه یکی از با تجربه ترین افراد در مامایی میباشد
        </p>
    </div>
    <p className='w-full bg-emerald-600 text-center text-white font-Morabba-Bold text-2xl py-2 cursor-pointer'>رزرو نوبت</p>
   </div>
  )
}

export default Doctor