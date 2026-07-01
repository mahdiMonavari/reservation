import {
  FiHeart,
  FiShield,
  FiStar,
  FiUsers,
  FiCheckCircle,
  FiLogIn,
  FiUserPlus,
  FiCalendar,
  FiClock,
  FiSmartphone,
  FiLayout,
} from "react-icons/fi";
import { GiFlowerPot } from "react-icons/gi";

const clinicServices = [
  {
    category: "بیماری‌های زنان و زایمان",
    icon: FiHeart,
    color:
      "bg-rose-50 dark:bg-rose-500/10 text-rose-500 border-rose-100 dark:border-rose-500/20",
    items: [
      "تشخیص و درمان بیماری‌های زنان",
      "زایمان فیزیولوژیک (طبیعی)",
      "گذاشتن IUD",
      "تعیین جنسیت",
      "درمان نازایی",
    ],
  },
  {
    category: "جراحی‌های درمانی و زیبایی",
    icon: FiShield,
    color:
      "bg-violet-50 dark:bg-violet-500/10 text-violet-500 border-violet-100 dark:border-violet-500/20",
    items: [
      "جراحی‌های درمانی زنان",
      "جراحی‌های زیبایی تخصصی",
      "لیزر درمانی",
      "لیزر زیبایی",
      "فشیال تخصصی",
    ],
  },
  {
    category: "طب مکمل",
    icon: GiFlowerPot,
    color:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 border-emerald-100 dark:border-emerald-500/20",
    items: [
      "هوموپاتی (Homeopathy)",
      "الوکولوتراپی (Auriculo Therapy)",
      "ترکیب طب مکمل با درمان‌های تخصصی",
      "افزایش اثربخشی درمان با رویکرد جامع",
    ],
  },
];

const howToSteps = [
  {
    step: "۱",
    icon: FiUserPlus,
    title: "ثبت‌نام یا ورود",
    desc: "اگه اولین باره وارد سایت میشی ثبت‌نام کن، اگه قبلاً عضو شدی فقط وارد شو. ورود به سایت نیازی به رمز عبور نداره — یه کد ۵ رقمی به شماره‌ات میاد و همین.",
    color:
      "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-500/20",
  },
  {
    step: "۲",
    icon: FiCalendar,
    title: "رزرو نوبت",
    desc: "بعد از ورود، مستقیم میری صفحه رزرو. اونجا اول متخصص مورد نظرت رو انتخاب می‌کنی، بعد خدماتی که لازم داری، و در آخر تاریخ و ساعت مراجعه‌ات رو تعیین می‌کنی.",
    color:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
  },
  {
    step: "۳",
    icon: FiSmartphone,
    title: "دریافت پیامک تأیید",
    desc: "بعد از ثبت نوبت، یه پیامک با تمام اطلاعات مراجعه‌ات — شامل تاریخ، ساعت و نام متخصص — به شماره‌ات ارسال میشه تا همیشه دم دستت باشه.",
    color:
      "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20",
  },
  {
    step: "۴",
    icon: FiLayout,
    title: "مدیریت نوبت‌ها",
    desc: "از طریق پنل کاربری‌ات می‌تونی همه نوبت‌های گذشته و آینده‌ات رو ببینی. اگه نیاز داشتی ساعت یا تاریخ مراجعه رو عوض کنی، خیلی راحت از همون پنل انجامش میدی.",
    color:
      "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-500/20",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-bl from-emerald-50 via-white to-teal-50
        dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 pt-32 pb-20"
      >
        <div
          className="absolute inset-0 opacity-30 dark:opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%), radial-gradient(circle at 80% 20%, #14b8a6 0%, transparent 40%)",
          }}
        />
        <div className="container relative text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-emerald-100 dark:bg-emerald-500/15
            border border-emerald-200 dark:border-emerald-500/30
            text-emerald-700 dark:text-emerald-300
            text-xs font-Dana-Medium mb-6"
          >
            <FiStar size={13} />
            بیش از ۳۵ سال سابقه درخشان
          </div>
          <h1 className="text-4xl md:text-5xl font-Morabba-Bold text-slate-900 dark:text-white mb-4 leading-tight">
            کلینیک تخصصی
            <span className="text-emerald-500"> زنان و زایمان</span>
          </h1>
          <p className="text-base font-Dana-Regular text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            با بهره‌گیری از دانش روز پزشکی و طب مکمل، سلامت شما اولویت ماست
          </p>
        </div>
      </div>

      {/* ── آمار ── */}
      <div className="container -mt-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              id: crypto.randomUUID(),
              value: "+۳۵",
              label: "سال سابقه",
              icon: FiStar,
            },
            {
              id: crypto.randomUUID(),
              value: "+۱۰۰۰۰",
              label: "بیمار موفق",
              icon: FiUsers,
            },
            {
              id: crypto.randomUUID(),
              value: "۳",
              label: "حوزه تخصصی",
              icon: FiShield,
            },
            {
              id: crypto.randomUUID(),
              value: "۱۰۰٪",
              label: "رضایت بیماران",
              icon: FiHeart,
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800
        p-5 text-center shadow-sm hover:shadow-md transition-all duration-200
        bg-white/80 backdrop-blur-sm dark:bg-slate-900/80"
              >
                <div
                  className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/15
        flex items-center justify-center mx-auto mb-3"
                >
                  <Icon
                    size={18}
                    className="text-emerald-600 dark:text-emerald-400"
                  />
                </div>
                <p className="text-2xl font-Morabba-Bold text-slate-800 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs font-Dana-Regular text-slate-500 dark:text-slate-500 mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── سکشن اول: درباره کلینیک ── */}
      <section className="container mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-Morabba-Bold text-slate-800 dark:text-white mb-3">
            خدمات کلینیک
          </h2>
          <p className="text-sm font-Dana-Regular text-slate-400 dark:text-slate-500 max-w-md mx-auto">
            طیف گسترده‌ای از خدمات تخصصی در سه حوزه اصلی ارائه می‌دهیم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clinicServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.category}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800
                  p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-4 ${service.color}`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-Morabba-Bold text-slate-800 dark:text-white text-base mb-4">
                  {service.category}
                </h3>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <FiCheckCircle
                        size={14}
                        className="text-emerald-500 shrink-0"
                      />
                      <span className="text-sm font-Dana-Regular text-slate-700 dark:text-slate-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── divider ── */}
      <div className="container mb-24">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800 to-transparent" />
      </div>

      {/* ── سکشن دوم: کار با سایت ── */}
      <section className="container pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-Morabba-Bold text-slate-800 dark:text-white mb-3">
            چطور نوبت بگیرم؟
          </h2>
          <p className="text-sm font-Dana-Regular text-slate-400 dark:text-slate-500 max-w-md mx-auto">
            در کمتر از ۲ دقیقه نوبتت رو آنلاین رزرو کن
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {howToSteps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800
                  p-6 hover:shadow-md transition-all duration-200 flex gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${item.color}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-Dana-Medium text-slate-400 dark:text-slate-500">
                      مرحله {item.step}
                    </span>
                    <h3 className="font-Morabba-Bold text-slate-800 dark:text-white text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm font-Dana-Regular text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
