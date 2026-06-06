"use client"
import { useState } from "react";
import { FaPhone } from "react-icons/fa";

function MembershipNewsletter() {
    const [number , setNumber] = useState("")
    const setNumberHandler = (e)=>{
        // if(number.length<11 && e.target.key !=="backspace"){
            setNumber(e.target.value)
        // }
    }
  return (
    <div className="relative w-90 h-15 rounded-full">
            <input type="text"
            inputMode="numeric"
            value={number} 
            maxLength={11}
             onChange={setNumberHandler} 
             className="absolute inset-0 rounded-full pl-20 pr-4 text-2xl dark:bg-gray-100 text-zinc-700"
            placeholder="شماره همراه خود را وارد کنید"/>
            <div className="rounded-l-full absolute left-0 w-17 h-full bg-yellow-700">
                <span className="absolute pl-5 left-0 top-1/2 -translate-y-1/2 text-2xl">
                    <FaPhone />
                </span>
            </div>            
        </div>
  )
    
}

export default MembershipNewsletter