"use client"
import React from 'react'
import Link from 'next/link'
import useReservationStore from '@/store/reservationStore'

function NavbarReservationLink() {
    const setStep = useReservationStore((state)=>state.setStep)
  return (
    <li>
      <Link
        onClick={()=>setStep(1)}
        href={"/reservation"}
        className="relative px-3 py-1.5 rounded-lg
          text-green-800/80 dark:text-gray-200
          hover:text-green-900 dark:hover:text-teal-400
          hover:bg-green-100/60 dark:hover:bg-teal-800/40
          transition-all duration-200 inline-block"
      >
        رزرو نوبت
      </Link>
    </li>
  )
}

export default NavbarReservationLink
