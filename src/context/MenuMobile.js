"use client";
import { createContext, useState } from "react";

export const menuMobile = createContext();

export function MenuProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <menuMobile.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </menuMobile.Provider>
  );
}
