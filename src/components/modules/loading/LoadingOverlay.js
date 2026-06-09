// components/ui/LoadingOverlay.jsx
"use client"
import { ClipLoader } from "react-spinners"

function LoadingOverlay({ loading }) {
  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center
      bg-emerald-950/60 backdrop-blur-sm
      transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        <ClipLoader
          color="#34d399"
          size={48}
          speedMultiplier={0.8}
        />
        <span className="text-emerald-300 text-sm font-Morabba-Bold animate-pulse">
          لطفاً صبر کنید...
        </span>
      </div>
    </div>
  )
}

export default LoadingOverlay