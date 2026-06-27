"use Client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavbarLink({ label, href, icon, role }) {
  const pathname = usePathname();
  console.log(href);
  return (href === "/p-admin/users" || href === "/p-admin/doctors") &&
    role === "DOCTOR" ? (
    ""
  ) : (
    <Link
      key={href}
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-slate-500 dark:text-slate-400
              hover:text-slate-900 dark:hover:text-slate-100
              hover:bg-violet-50 dark:hover:bg-slate-800/70
              transition-all duration-200 group text-right ${
                pathname === href
                  ? `
              border border-slate-800 dark:border-white/30
              `
                  : ""
              }`}
    >
      <span
        className="text-violet-400 dark:text-violet-500
              group-hover:text-emerald-500 dark:group-hover:text-emerald-400
              transition-colors duration-200 text-xl"
      >
        {icon}
      </span>
      <span className="text-xl font-Morabba-Bold">{label}</span>
    </Link>
  );
}

export default NavbarLink;
