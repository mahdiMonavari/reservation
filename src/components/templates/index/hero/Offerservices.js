"use client"
import { offerServices } from "@/utiles/const"
import { useEffect, useState, useRef } from "react"

function Offerservices() {
  const [index, setIndex]= useState(0)
  const [phase, setPhase]= useState('visible') // 'visible' | 'exit' | 'enter'
  const timerRef= useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPhase('exit')
      setTimeout(() => {
        setIndex(prev => (prev + 1) % offerServices.length)
        setPhase('enter')

        // brief enter frame, then settle
        setTimeout(() => setPhase('visible'), 320)
      }, 300)
    }, 3000)

    return () => clearTimeout(timerRef.current)
  }, [index])

  const styles = {
    visible: 'opacity-100 translate-y-0  rotate-0   skew-x-0',
    exit:    'opacity-0  translate-y-3   -rotate-6  skew-x-3',
    enter:   'opacity-0  -translate-y-3  rotate-3   -skew-x-2',
  }

  return (
    <span
      className={`block text-yellow-200 origin-bottom-right
        transition-all duration-300 ease-in-out
        ${styles[phase]}`}
    >
      {offerServices[index].title}
    </span>
  )
}

export default Offerservices