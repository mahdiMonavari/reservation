"use client";

import { Toaster } from "react-hot-toast";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

export default function ClientProviders({ children }) {
  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
