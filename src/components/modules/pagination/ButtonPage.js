import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function ButtonPage({ currentPage, value }) {
  const isActive = currentPage === value;
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleGoPage = () => {
    const search = searchParams.get("search") || "";
    router.push(`?search=${search}&page=${value}`);
  };

  return (
    <button
      onClick={handleGoPage}
      className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200
        ${
          isActive
            ? "bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/30"
            : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400"
        }`}
    >
      {value}
    </button>
  );
}
export default ButtonPage;
