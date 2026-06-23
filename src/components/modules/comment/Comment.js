import { FaUserCircle, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

function Comment({ userId, text, isVerified }) {
  const fullName =
    `${userId?.firstName || ""} ${userId?.lastName || ""}`.trim();

  return (
    <div className="flex flex-col gap-3 w-full">
      <FaQuoteLeft size={16} className="text-emerald-400 opacity-60" />

      <p
        className="text-sm leading-relaxed
        text-slate-800 dark:text-slate-300
        font-Dana-Medium line-clamp-2"
      >
        {text}
      </p>

      <div
        className="flex items-center justify-between pt-2
        border-t border-slate-100 dark:border-emerald-900/50"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full shrink-0
            bg-emerald-100 dark:bg-emerald-900/40
            text-emerald-600 dark:text-emerald-400
            flex items-center justify-center"
          >
            <FaUserCircle size={16} />
          </div>
          <span
            className="text-xs font-Morabba-Bold
            text-slate-700 dark:text-slate-200"
          >
            {fullName || "کاربر ناشناس"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
