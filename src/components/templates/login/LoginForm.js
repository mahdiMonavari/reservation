"use client"
import clsx from 'clsx'
import Link from 'next/link'
import { FaUserEdit } from "react-icons/fa";
import React, { useState } from 'react'

function LoginForm() {
  const [phoneNumber , setPhoneNumber] = useState("")
  const [isLoginWithPassword , setIsLoginWithPassword] = useState(false)
  return (
        <>
    <div className='relative space-y-5 mb-5'>
            <div className='mb-5 flex items-center justify-center rounded-full bg-emerald-700 text-gray-300 overflow-hidden cursor-pointer'>
              <span className={clsx('flex-1 text-center py-1 px-4',!isLoginWithPassword && "bg-emerald-500 text-white")}
              onClick={e=>setIsLoginWithPassword(false)}
              >پیامک</span>
              <span className={clsx('flex-1 text-center py-1 px-4',isLoginWithPassword && "bg-emerald-500 text-white")}
              onClick={e=>setIsLoginWithPassword(true)}>رمز عبور</span>
            </div>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              inputMode='numeric'
              maxLength={11}
              placeholder='شماره تماس'
              className='w-full border-b-2 border-emerald-700 dark:border-emerald-900 py-3 px-1 text-lg text-gray-900
               dark:text-white focus:outline-none focus:ring-0 focus:border-emerald-200 dark:focus:border-emerald-400               
                bg-transparent placeholder:text-2xl placeholder:text-emerald-700 placeholder:dark:text-emerald-900
                focus:placeholder:opacity-0 placeholder:transition-all placeholder:duration-300 placeholder:opacity-90
                placeholder:animate-bounce placeholder:[animation-duration:2s] placeholder:font-Morabba-Medium'
            />
            {
              isLoginWithPassword ?
              <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"              
              placeholder='رمز عبور'
              className='w-full border-b-2 border-emerald-700 dark:border-emerald-900 py-3 px-1 text-lg text-gray-900
               dark:text-white focus:outline-none focus:ring-0 focus:border-emerald-200 dark:focus:border-emerald-400               
                bg-transparent placeholder:text-2xl placeholder:text-emerald-700 placeholder:dark:text-emerald-900
                focus:placeholder:opacity-0 placeholder:transition-all placeholder:duration-300 placeholder:opacity-90
                placeholder:animate-bounce placeholder:[animation-duration:2s] placeholder:font-Morabba-Medium'
            />
              :""
            }            
          </div>
          <button
            type='submit'
            className='w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg'
          >
            ورود
          </button>
          <div className='mt-5 text-md text-emerald-900 dark:text-emerald-700'>
              <Link href={"/register"}>
                <span className='flex items-center gap-2 justify-center'>
                  رفتن به صفحه ثبت نام
                  <FaUserEdit />                  
                </span>
              </Link>
          </div>
    </>
  )
}

export default LoginForm