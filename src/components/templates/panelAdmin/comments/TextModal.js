"use client";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { successToast, errorToast } from "@/components/modules/toast/toast";

export default function TextModal({ text, onClose, id, setAnsweredIds }) {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    setVisible(true);
    setTimeout(() => setAnimClass("open"), 10);
    getAnswers();
  }, []);

  const handleClose = () => {
    setAnimClass("");
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 300);
  };

  const getAnswers = async () => {
    try {
      const res = await fetch(`/api/comments/answers/${id}`);
      if (res.status === 200) {
        const { data } = await res.json();
        setAnswers(data);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    try {
      setIsSending(true);
      const res = await fetch("/api/comments/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentId: id, text: replyText }),
      });
      if (res.status === 201) {
        const { data } = await res.json();
        setAnswers((prev) => [...prev, data]);
        setReplyText("");
        successToast("جواب ثبت شد");
        setAnsweredIds((prev) => new Set([...prev, id]));
      } else {
        errorToast("خطایی پیش آمد");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsSending(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300
        ${animClass === "open" ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"}`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: animClass === "open" ? "scale(1)" : "scale(0)",
          opacity: animClass === "open" ? 1 : 0,
          transition: "transform 300ms ease, opacity 300ms ease",
        }}
        className="relative w-full max-w-lg mx-4 rounded-2xl
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          shadow-xl flex flex-col overflow-hidden max-h-[80vh]"
      >
        <LoadingOverlay loading={isLoading} />

        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg
              text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
          <p className="text-base font-Morabba-Bold text-slate-800 dark:text-slate-100">
            مشاهده کامنت
          </p>
        </div>

        {/* متن کامنت */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <p className="text-sm font-Dana-Medium text-slate-600 dark:text-slate-300 leading-7 text-right">
            {text}
          </p>
        </div>

        {/* جوابها */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {!isLoading && answers.length === 0 && (
            <p className="text-center text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 py-4">
              هنوز جوابی ثبت نشده
            </p>
          )}
          {answers.map((answer) => (
            <div
              key={answer._id}
              className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50
                rounded-xl p-3 border border-slate-100 dark:border-slate-800"
            >
              <div
                className="w-7 h-7 rounded-lg shrink-0
                  bg-violet-100 dark:bg-violet-900/30
                  text-violet-600 dark:text-violet-400
                  flex items-center justify-center"
              >
                <FaUser size={11} />
              </div>
              <div className="flex-1 text-right">
                <p className="text-xs font-Morabba-Bold text-violet-600 dark:text-violet-400 mb-1">
                  {answer.userId?.firstName} {answer.userId?.lastName}
                </p>
                <p className="text-sm font-Dana-Medium text-slate-600 dark:text-slate-300 leading-6">
                  {answer.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* اینپوت جواب */}
        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReply}
              disabled={isSending || !replyText.trim()}
              className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0
                bg-violet-600 hover:bg-violet-700 text-white
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-150 active:scale-95"
            >
              <FiSend size={15} />
            </button>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleReply()}
              placeholder="جواب بنویسید..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-Dana-Medium
                bg-slate-100 dark:bg-slate-800
                text-slate-800 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-600
                border border-transparent
                focus:border-violet-400 dark:focus:border-violet-600
                focus:outline-none focus:bg-white dark:focus:bg-slate-800
                transition-all duration-200 text-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
