import { FaCheckCircle, FaClock, FaReply } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function CommentCard({ item }) {
  const fullName = item.userId
    ? `${item.userId.firstName} ${item.userId.lastName}`
    : "کاربر ناشناس";
  const initial = item.userId?.firstName?.[0] || "ک";

  return (
    <div
      className="rounded-2xl border
      bg-emerald-50/80 dark:bg-slate-900/50
      border-emerald-200/80 dark:border-emerald-900/30
      backdrop-blur-sm hover:shadow-md
      transition-all duration-300 overflow-hidden"
    >
      <div className="p-5 flex gap-4">
        {/* avatar */}
        <div className="relative shrink-0">
          <div
            className="w-12 h-12 rounded-xl
            bg-gradient-to-br from-emerald-400 to-teal-500
            flex items-center justify-center
            text-lg font-Morabba-Bold text-white
            shadow-md shadow-emerald-200 dark:shadow-none"
          >
            {initial}
          </div>
          {item.isVerified && (
            <div
              className="absolute -bottom-1 -right-1
              bg-white dark:bg-slate-800 rounded-full p-0.5 shadow-sm"
            >
              <MdVerified size={14} className="text-emerald-500" />
            </div>
          )}
        </div>

        {/* content */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex flex-col gap-0.5">
              <span className="font-Morabba-Bold text-emerald-950 dark:text-emerald-50">
                {fullName}
              </span>
              {item.isVerified ? (
                <span className="flex items-center gap-1 text-xs font-Dana-Medium text-emerald-500">
                  <FaCheckCircle size={9} /> تایید شده
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-Dana-Medium text-amber-500">
                  <FaClock size={9} /> در انتظار تایید
                </span>
              )}
            </div>
            <span
              className="text-xs font-Dana-Medium
              text-emerald-700/60 dark:text-emerald-400/50
              bg-emerald-100 dark:bg-emerald-900/20
              px-2.5 py-1 rounded-full shrink-0"
            >
              {new Date(item.createdAt).toLocaleDateString("fa-IR")}
            </span>
          </div>

          <p
            className="text-sm font-Dana-Medium
            text-emerald-950/80 dark:text-emerald-50/80
            leading-relaxed"
          >
            {item.text}
          </p>
        </div>
      </div>

      {/* answers */}
      {item.answers?.length > 0 && (
        <div className="border-t border-emerald-200/80 dark:border-emerald-900/30">
          {item.answers.map((answer) => {
            const answerName = answer.userId
              ? `${answer.userId.firstName} ${answer.userId.lastName}`
              : "کاربر ناشناس";
            return (
              <div
                key={answer._id}
                className="flex gap-3 px-5 py-4
                  bg-emerald-100/60 dark:bg-emerald-900/10"
              >
                <FaReply
                  size={12}
                  className="text-emerald-400 mt-1 shrink-0 rotate-180"
                />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className="text-xs font-Morabba-Bold
                      text-emerald-700 dark:text-emerald-400"
                    >
                      {answerName}
                    </span>
                    <span
                      className="text-xs font-Dana-Medium
                      text-emerald-600/40 dark:text-emerald-500/40"
                    >
                      {new Date(answer.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                  <p
                    className="text-sm font-Dana-Medium
                    text-emerald-900/70 dark:text-emerald-100/70
                    leading-relaxed"
                  >
                    {answer.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
