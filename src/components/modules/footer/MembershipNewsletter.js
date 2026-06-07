"use client"
import { useState } from "react";
import { FaPhone } from "react-icons/fa";

function MembershipNewsletter() {
    const [number, setNumber] = useState("");

    return (
        <div className="relative w-full h-14 rounded-2xl overflow-hidden border border-emerald-200 dark:border-emerald-800 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
            <input 
                type="text"
                inputMode="numeric"
                value={number} 
                maxLength={11}
                onChange={(e) => setNumber(e.target.value)} 
                className="w-full h-full pr-4 pl-16 bg-white dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-50 placeholder:text-emerald-400 outline-none"
                placeholder="شماره همراه..."
            />
            <button className="absolute left-0 top-0 h-full w-14 flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                <FaPhone className="text-lg" />
            </button>
        </div>
    );
}
export default MembershipNewsletter;
