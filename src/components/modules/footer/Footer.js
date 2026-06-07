import Link from "next/link";
import MembershipNewsletter from "./MembershipNewsletter";

function Footer() {
  const links = ["خانه", "درباره ما", "ارتباط با ما", "دکترها", "رزرو نوبت"];
  
  return (
    <footer className="border-t border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-emerald-950/20 backdrop-blur-lg">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* لینک‌های دسترسی */}
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link} className="group">
              <Link href="#" className="text-emerald-900 dark:text-emerald-50 transition-all group-hover:text-emerald-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* اطلاعات تماس */}
        <div className="text-emerald-900 dark:text-emerald-100 space-y-6">
          <div>
            <h2 className="font-shabnam-bold mb-2">آدرس دفتر</h2>
            <p className="text-sm opacity-80 leading-relaxed">دولت آباد، خیابان طالقانی، ساختمان پزشکان، پلاک ۱۲</p>            
          </div>
          <div>
            <h2 className="font-shabnam-bold mb-2">شماره تماس</h2>
            <p className="text-emerald-600 font-mono text-lg">۰۹۱۳-۱۰۵-۰۶۴۹</p>            
          </div>
        </div>

        {/* خبرنامه */}
        <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-900 dark:text-emerald-50">عضویت در خبرنامه</h3>
            <MembershipNewsletter />
        </div>        
      </div>
    </footer>
  )
}
export default Footer;
