import React from 'react'
import CommentSlide from '../commentSlide/CommentSlide'

function CommentSection() {
  return (
    <div className='flex items-center justify-center mt-20 gap-x-20 pb-10'>
        <div className='relative' data-aos="fade-left">
            <div className='w-120 h-30 relative'>
                <div className='absolute h-full w-full dark:bg-zinc-600 bg-gray-300 rounded-sm -rotate-12 z-4'></div>
                <div className='absolute h-full w-full dark:bg-zinc-700 bg-gray-200 rounded-sm -rotate-6 z-5'></div>
                <div className='absolute h-full w-full dark:bg-zinc-900 bg-gray-100 rounded-sm rotate-0 z-6 shadow p-4'>
                    <CommentSlide/>
                </div>
            </div>
        </div>
        <div className='dark:text-emerald-300 text-emerald-600' data-aos="fade-right">
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