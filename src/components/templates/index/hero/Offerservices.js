"use client"
import { offerServices } from "@/utiles/const"
import clsx from "clsx"
import { useEffect, useState } from "react"

function Offerservices() {
    const [indexService , setIndexService] = useState(0)
    const [isRotation , setIsRotation] = useState(false)
    useEffect(()=>{
        const timerShow = setTimeout(()=>{
            setIsRotation(true)    
            setTimeout(()=>{
                setIsRotation(false)
                if(indexService < offerServices.length-1)
                {
                    setIndexService(indexService+1)
                }else{
                    setIndexService(0)
                }
            },300)
        },3000)    
        return ()=>{
            clearTimeout(timerShow)
        }
    },[indexService])
  return (
    <>
        <span className={clsx(`block text-yellow-200 origin-bottom-right transition-transform duration-300`,
        isRotation ? "-rotate-100" :"rotate-0")}>
            {
                offerServices[indexService].title
            }
        </span>
    </>
  )
}

export default Offerservices