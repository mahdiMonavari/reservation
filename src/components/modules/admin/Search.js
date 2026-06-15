import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { FiSearch } from "react-icons/fi";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      startTransition(() => {
        router.push(`?search=${value}&page=1`);
      });
    },
    [router]
  );

  return (
    <div className="relative">
      <FiSearch
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={15}
      />
      <input
        type="text"
        placeholder="جستجو..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={handleSearch}
        className={`w-64 pr-9 pl-4 py-2 text-sm rounded-xl
          bg-slate-100 dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          placeholder:text-slate-400
          border border-transparent
          focus:border-violet-400 dark:focus:border-violet-600
          focus:outline-none transition-all duration-200
          ${isPending ? "opacity-60" : ""}`}
      />
    </div>
  );
}

export default SearchInput;
