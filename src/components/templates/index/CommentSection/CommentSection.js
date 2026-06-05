import React from 'react'

function CommentSection() {
  return (
    <div className='flex items-center justify-center mt-20'>
        <div></div>
        <div className='dark:text-emerald-300 text-emerald-600'>
            <div className='flex items-center gap-2'>
                <span className='inline-block w-20 h-0.5 dark:bg-emerald-300 bg-emerald-800/70 rounded-full'></span>
                <span className='dark:text-emerald-300 text-emerald-800/70'>رضایت شما اعبار ماست</span>
            </div>
            <h2 className='text-3xl mt-4 font-shabnam-bold text-emerald-900 dark:text-gray-100'>نظر مراجه کنندگان ما</h2>
            <div className='max-w-100 text-justify mt-4 text-xl'>
                <p className='text-emerald-800/70 dark:text-gray-300'>در این بخش میتوانید تجربهای واقعی مراجه کنندگانی را بخانید که مراقبتهای خود را در کلینک ما گذزاندند</p>
                <p className='text-emerald-800/70 dark:text-gray-300'>این نظرات نشاندهنده کیفیت خدمات ، عملکرد متخصصین ، و میزان رضایت شما را نشان میدهد</p>
            </div>
        </div>
    </div>
  )
}

export default CommentSection