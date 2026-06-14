// components/ui/LoadingOverlay.jsx
"use client";
import { ClipLoader } from "react-spinners";

function LoadingOverlay({ loading }) {
  if (!loading) return null;

  return (
    <div
      className="absolute inset-0 z-[9999] flex items-center justify-center
      bg-gray-300/5 backdrop-blur-sm dark:bg-gray-800/60
      transition-all duration-300"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="dark:hidden block">
          <ClipLoader color="#006045" size={48} speedMultiplier={0.8} />
        </span>
        <span className="hidden dark:block ">
          <ClipLoader color="#5ee9b6" size={48} speedMultiplier={0.8} />
        </span>
        <span className="text-emerald-800 dark:text-emerald-300 text-sm font-Morabba-Bold animate-pulse">
          لطفاً صبر کنید...
        </span>
      </div>
    </div>
  );
}

export default LoadingOverlay;
