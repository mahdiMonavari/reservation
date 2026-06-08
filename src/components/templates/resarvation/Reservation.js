"use client"
import useReservationStore from '@/store/reservationStore'
import React from 'react'

function Reservation() {
    const step = useReservationStore((state)=>state.step)
    console.log(step);
  return (
    <div className='container flex gap-2 pt-21'>
        
    </div>
  )
}

export default Reservation