import React from 'react'
import CountNumber from './CountNumber'
import { MdHealthAndSafety } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { PiTimerDuotone } from "react-icons/pi";
import Offerservices from './Offerservices';

const features = [
  { icon: <MdHealthAndSafety />, label: 'کار با دقت بالا' },
  { icon: <PiTimerDuotone />,   label: 'اختصاص زمان کافی' },
  { icon: <GrUserExpert />,     label: 'بالاترین مهارت' },
];

function Hero() {
  return (
    <div className="font-Morabba-Bold tracking-[0.1rem] w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-160 space-y-4">

      {/* ── Main heading ── */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl leading-snug
        bg-gradient-to-l from-green-500/80 via-green-200/80 to-green-500/80
        dark:from-teal-950 dark:via-teal-500 dark:to-teal-950
        bg-clip-text text-transparent inline-block text-start">
        سلامت مادر و جنین را الان رزرو کنید
      </h1>

      {/* ── Sub-heading with counter ── */}
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-500 dark:text-teal-950 leading-relaxed">
        با بیش از{' '}
        <span className="text-green-100 dark:text-teal-500">
          <CountNumber />
        </span>
        {' '}سال سابقه درخشان
      </h2>

      {/* ── Feature cards ── */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
        {features.map(({ icon, label }) => (
          <div
            key={label}
            className="bg-green-800/20 dark:bg-teal-950/40 rounded-lg py-3 px-1 sm:px-3
              text-center transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl dark:text-teal-500 text-green-100
              mb-1 sm:mb-2 flex justify-center">
              {icon}
            </span>
            <h3 className="text-xs sm:text-base md:text-xl text-green-100 leading-tight">
              {label}
            </h3>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="w-full h-px rounded-full
        bg-gradient-to-l from-green-500 via-green-200 to-green-500
        dark:from-teal-950 dark:via-teal-500 dark:to-teal-950" />

      {/* ── Animated service offer ── */}
      <div className="text-2xl sm:text-3xl md:text-4xl font-Dana-Medium font-shabnam-bold mt-3">
        <div className="overflow-hidden">
          <span className="bg-gradient-to-l from-yellow-500 via-yellow-300 to-yellow-500
            bg-clip-text text-transparent ml-2 sm:ml-3">
            ارائه دهنده خدمات
          </span>
          <span className="block">
            <Offerservices />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Hero