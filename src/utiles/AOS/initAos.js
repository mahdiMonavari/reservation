"use client";

import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

function AOSInit() {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      Aos.init();
    }, 1000);
    () => clearTimeout(timeOut);
  }, []);

  return null;
}

export default AOSInit;
