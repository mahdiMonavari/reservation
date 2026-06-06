import React, { useState } from 'react'

function VerifyNumber({phoneNumber, setPhoneNumber , setIsPhoneVerified}) {
    const [isCodeSent, setIsCodeSent] = useState(false)
  return (
    <>
    {
        !isCodeSent ?     <div className='space-y-6'>
          <div className='relative'>
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
          </div>
          <button
            type='submit'
            className='w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg'
          >
            ارسال کد
          </button>
        </div>:<div>
<div className='relative'>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              inputMode='numeric'
              maxLength={11}
              placeholder='کد دریافتی را وارد کنید'
              className='w-full border-b-2 border-emerald-700 dark:border-emerald-900 py-3 px-1 text-lg text-gray-900
               dark:text-white focus:outline-none focus:ring-0 focus:border-emerald-200 dark:focus:border-emerald-400               
                bg-transparent placeholder:text-2xl placeholder:text-emerald-700 placeholder:dark:text-emerald-900
                focus:placeholder:opacity-0 placeholder:transition-all placeholder:duration-300 placeholder:opacity-90
                placeholder:animate-bounce placeholder:[animation-duration:2s] placeholder:font-Morabba-Medium'
            />  
          </div>
          <button
            type='submit'
            className='w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg'
          >
            اعتبار سنجی
          </button>
        </div>
    }
    </>
  )
}

export default VerifyNumber