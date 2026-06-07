"use client"
import { useState } from 'react'
import Link from 'next/link'
import ThemeCta from './ThemeCta'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

export default function MobileMenu({ theme, navLinks }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="sm:hidden fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3
          bg-green-50/80 dark:bg-teal-900/80 backdrop-blur-md
          border-b border-green-200/50 dark:border-teal-700/40
          shadow-sm"
      >
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="منو"
          className="text-2xl text-green-800 dark:text-gray-100
            hover:text-green-600 dark:hover:text-teal-400 transition-colors"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <span className="font-Morabba-Bold text-lg text-green-800 dark:text-gray-100">
          کلینیک
        </span>

        <ThemeCta prevTheme={theme} />
      </div>

      {/* Drawer */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden
          bg-green-50/95 dark:bg-teal-900/95 backdrop-blur-md
          border-b border-green-200/50 dark:border-teal-700/40
          ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1 font-Morabba-Bold text-lg">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2.5 px-3 rounded-lg
                  text-green-800/80 dark:text-gray-200
                  hover:text-green-900 dark:hover:text-teal-400
                  hover:bg-green-100/60 dark:hover:bg-teal-800/40
                  transition-all duration-200 text-right"
              >
                {label}
              </Link>
            </li>
          ))}
          {/* Auth links */}
          <li className="pt-2 border-t border-green-200/50 dark:border-teal-700/40 mt-1">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-end gap-3 py-2.5 px-3 rounded-lg
                text-green-800/80 dark:text-gray-200
                hover:bg-green-100/60 dark:hover:bg-teal-800/40
                transition-all duration-200"
            >
              <span>ثبت نام</span>
              <span className="h-4 w-px rounded-full bg-green-400/60 dark:bg-teal-600" />
              <span>ورود</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}