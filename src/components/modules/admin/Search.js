"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { FiSearch } from "react-icons/fi";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value || "";
      startTransition(() => {
        router.push(`?search=${value}&page=1`);
      });
    },
    [router]
  );

  return (
    <div className="relative w-full sm:w-56 md:w-64">
      <FiSearch
        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200
          ${
            isPending
              ? "text-violet-400 dark:text-violet-500"
              : "text-slate-400 dark:text-slate-500"
          }`}
        size={14}
      />
      <input
        type="text"
        placeholder="جستجو..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={handleSearch}
        className={`w-full pr-9 pl-4 py-2 text-sm font-Dana-Medium rounded-xl
          bg-slate-100 dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-600
          border border-transparent
          focus:border-violet-400 dark:focus:border-violet-600
          focus:bg-white dark:focus:bg-slate-800
          focus:outline-none
          transition-all duration-200
          ${isPending ? "opacity-60" : "opacity-100"}`}
      />
      {isPending && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}

export default SearchInput;
