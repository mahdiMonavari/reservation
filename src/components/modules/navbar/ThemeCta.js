"use client"
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";


function ThemeCta({prevTheme}) {    
    const [state ,setState] = useState(prevTheme)
    const changeThemeHandler=(theme)=>{
        console.log(theme);
        document.documentElement.className = theme;
        document.cookie = `theme=${theme};path=/;max-age=3153600`
        setState(theme)
    }
  return (
    <div>
        {
            state==="dark"
                ?<span onClick={()=>changeThemeHandler("light")}><FaSun/></span>
                :<span onClick={()=>changeThemeHandler("dark")}><FaMoon/></span>
        }        
    </div>
  )
}

export default ThemeCta