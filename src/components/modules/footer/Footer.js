import Link from "next/link";
import MembershipNewsletter from "./MembershipNewsletter";
import { FiMapPin, FiPhone } from "react-icons/fi";

const links = [
  { label: "خانه", href: "/" },
  { label: "درباره ما", href: "#" },
  { label: "ارتباط با ما", href: "#" },
  { label: "دکترها", href: "#" },
  { label: "رزرو نوبت", href: "/reservation" },
];

function Footer() {
  return (
    <footer className="border-t border-emerald-100 dark:border-emerald-900/40 bg-white dark:bg-slate-950">
      <div className="container py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* لینک‌ها */}
        <div>
          <h3 className="font-Morabba-Bold text-emerald-900 dark:text-white text-lg mb-5">
            دسترسی سریع
          </h3>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.label} className="group">
                <Link
                  href={link.href}
                  className="flex items-center gap-2.5 text-sm font-Dana-Regular
                    text-slate-500 dark:text-slate-400
                    hover:text-emerald-600 dark:hover:text-emerald-400
                    transition-colors duration-150"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400
                      opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* اطلاعات تماس */}
        <div>
          <h3 className="font-Morabba-Bold text-emerald-900 dark:text-white text-lg mb-5">
            اطلاعات تماس
          </h3>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <FiMapPin size={14} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-Dana-Medium text-slate-400 dark:text-slate-500 mb-1">
                  آدرس دفتر
                </p>
                <p className="text-sm font-Dana-Regular text-slate-600 dark:text-slate-300 leading-relaxed">
                  دولت آباد، خیابان طالقانی، ساختمان پزشکان، پلاک ۱۲
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <FiPhone size={14} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-Dana-Medium text-slate-400 dark:text-slate-500 mb-1">
                  شماره تماس
                </p>
                <p
                  className="text-sm font-Morabba-Bold text-emerald-600 dark:text-emerald-400"
                  dir="ltr"
                >
                  ۰۹۱۳-۱۰۵-۰۶۴۹
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* خبرنامه */}
        <div>
          <h3 className="font-Morabba-Bold text-emerald-900 dark:text-white text-lg mb-2">
            عضویت در خبرنامه
          </h3>
          <p className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500 mb-5">
            از آخرین اخبار و تخفیف‌های کلینیک مطلع شوید
          </p>
          <MembershipNewsletter />
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <div className="container py-4 flex items-center justify-center">
          <p className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500">
            تمامی حقوق برای کلینیک محفوظ است ©{" "}
            {new Date().getFullYear().toLocaleString("fa-IR")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
