"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  ArrowUpLeft,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

// Replace these with the real values for the clinic
const CONTACT = {
  phone: "031-485-23151",
  mobile: "0913-1050-649",
  email: "mina.shabani1348@gmail.com",
  address: "اصفهان، دولت آباد، بلوار طالقانی، ایستگاه دبیرستان، پشت اداره پست",
  hours: [{ day: "شنبه تا پنجشنبه", time: "۹:۰۰ - ۱۴:۰۰" }],
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1676.7593911281183!2d51.69506674930598!3d32.80501666040489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfa!2s!4v1783226488745!5m2!1sfa!2s",
};

const infoItems = [
  {
    icon: Phone,
    label: "تلفن مطب",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/-/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "پیامک و واتس‌اپ",
    value: CONTACT.mobile,
    href: `tel:${CONTACT.mobile.replace(/-/g, "")}`,
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: MapPin,
    label: "آدرس",
    value: CONTACT.address,
    href: undefined,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactUsPage() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-white py-24 px-6 dark:bg-slate-950 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/2 h-[28rem] w-[28rem] translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/10"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="font-shabnam-bold inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs text-emerald-700 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            همیشه در دسترس شما
          </span>

          <h2 className="font-Morabba-Bold mt-5 text-3xl text-slate-900 dark:text-white md:text-4xl">
            راه‌های ارتباطی با ما
          </h2>
          <svg
            viewBox="0 0 200 24"
            className="mx-auto mt-5 h-5 w-40 text-emerald-500/60 dark:text-emerald-400/50"
            fill="none"
          >
            <path
              d="M0 12H70L80 2L95 22L108 6L118 18L128 12H200"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="font-Danafont-Dana-Medium-Medium mx-auto mt-4 max-w-md text-lg leading-7 text-slate-500 dark:text-slate-400">
            برای گرفتن نوبت، مشاوره یا هر سوالی که دارید، از راه‌های زیر با مطب
            در ارتباط باشید.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2 rounded-3xl border border-slate-200 bg-slate-50/80 p-7 dark:border-slate-800 dark:bg-slate-900/60"
          >
            <ul className="space-y-2">
              {infoItems.map(({ icon: Icon, label, value, href }) => {
                const Wrapper = href ? "a" : "div";
                return (
                  <motion.li key={label} variants={item}>
                    <Wrapper
                      {...(href ? { href } : {})}
                      className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-500/5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-105 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                      <span className="pt-1.5">
                        <span className="font-shabnam-bold block text-xs text-slate-400 dark:text-slate-500">
                          {label}
                        </span>
                        <span className="font-Dana-Medium mt-0.5 block text-sm leading-6 text-slate-700 dark:text-slate-200">
                          {value}
                        </span>
                      </span>
                    </Wrapper>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              variants={item}
              className="mt-5 rounded-2xl border border-dashed border-slate-200 p-4 dark:border-slate-800"
            >
              <div className="mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Clock size={16} />
                <span className="font-shabnam-bold text-xs">ساعات پذیرش</span>
              </div>
              {CONTACT.hours.map((h) => (
                <div
                  key={h.day}
                  className="font-Dana-Medium flex items-center justify-between py-1 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span>{h.day}</span>
                  <span className="tabular-nums text-slate-600 dark:text-slate-400">
                    {h.time}
                  </span>
                </div>
              ))}
            </motion.div>

            <Link
              variants={item}
              href="/reservation"
              className="font-Dana-Medium group mt-6 flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-500/30 dark:shadow-emerald-500/10"
            >
              رزرو نوبت آنلاین
              <ArrowUpLeft
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-[-2px]"
              />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative lg:col-span-3 min-h-[22rem] overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800"
          >
            <iframe
              title="موقعیت مطب روی نقشه"
              src={CONTACT.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-[15%] dark:brightness-[0.85] dark:invert dark:hue-rotate-180 dark:grayscale"
              style={{ border: 0, minHeight: "22rem" }}
            />

            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center">
              <span className="relative flex h-14 w-14 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 ring-4 ring-white dark:ring-slate-950">
                  <MapPin size={17} strokeWidth={2} />
                </span>
              </span>
            </div>
            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-center">
              <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur dark:bg-slate-900/90">
                <MapPin
                  size={15}
                  className="shrink-0 text-emerald-600 dark:text-emerald-400"
                />
                <span className="font-Dana-Medium text-xs text-slate-600 dark:text-slate-300">
                  {CONTACT.address}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
