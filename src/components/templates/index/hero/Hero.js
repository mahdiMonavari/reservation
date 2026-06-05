import React from 'react'
import CountNumber from './CountNumber'
import { MdHealthAndSafety } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { PiTimerDuotone } from "react-icons/pi";
import Offerservices from './Offerservices';


function Hero() {
  return (
    <div className='font-Morabba-Bold space-y-3 tracking-[0.1rem] max-w-160'>
        <h1 className="text-4xl bg-gradient-to-l from-green-500/80 via-green-200/80 to-green-500/80 text-start
        bg-clip-text text-transparent inline-block dark:from-teal-950 dark:via-teal-500  dark:to-teal-950">  
            سلامت مادر و جنین را الان رزرو کنید
        </h1>
        <h2 className='text-3xl text-green-500 dark:text-teal-950'>با بیش از <span className='text-green-100 dark:text-teal-500'>
            {" "}<CountNumber/>{" "}
            </span> سال سابقه درخشان</h2>
            <div className='flex items-center justify-between mt-4 gap-2'>
                <div className='w-full border-b-r bg-green-800/20 text-center dark:bg-teal-950/40 py-3 rounded-md'>
                    <span className='text-4xl dark:text-teal-500 mb-2 flex justify-center text-green-100'>
                        <MdHealthAndSafety />
                    </span>
                    <h3 className='text-2xl text-green-100'>کار با دقت بالا</h3>
                </div>
                <div className='w-full border-b-r bg-green-800/20 text-center dark:bg-teal-950/40 py-3 rounded-md'>
                    <span className='text-4xl dark:text-teal-500 mb-2 flex justify-center text-green-100'>
                        <PiTimerDuotone />
                    </span>
                    <h3 className='text-2xl text-green-100'>اختصاص زمان کافی</h3>
                </div>
                <div className='w-full border-b-r bg-green-800/20 text-center dark:bg-teal-950/40 py-3 rounded-md'>
                    <span className='text-4xl dark:text-teal-500 mb-2 flex justify-center text-green-100'>
                        <GrUserExpert />
                    </span>
                    <h3 className='text-2xl text-green-100'>بالاترین مهارت</h3>
                </div>
            </div>
            <div className='bg-gradient-to-l w-full h-px rounded-full from-green-500 via-green-200 to-green-500
            dark:from-teal-950 dark:via-teal-500  dark:to-teal-950'></div>
            <div className='mt-3 text-4xl font-Dana-Medium font-shabnam-bold'>
                <div className='overflow-hidden'>
                    <span className='bg-gradient-to-l from-yellow-500 via-yellow-300 to-yellow-500 inline-block ml-3
                    bg-clip-text text-transparent'>ارائه دهنده خدمات</span>
                    <span className='block'>
                        <Offerservices/>
                    </span>
                </div>                
            </div>
    </div>
  )
}

export default Hero