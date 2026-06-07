import React from 'react'

function DoctorServices() {
  return (
    <section className="container py-16">
        <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50 mb-8 text-center">خدمات قابل ارائه</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { title: "مراقبت‌های دوران بارداری", desc: "بررسی وضعیت جنین و مادر به صورت دوره‌ای با تجهیزات مدرن" },
                { title: "زایمان طبیعی و سزارین", desc: "مشاوره تخصصی و انجام زایمان در بهترین بیمارستان‌های تهران" },
                { title: "درمان عفونت‌های زنان", desc: "تشخیص و درمان سریع انواع عفونت‌ها با روش‌های نوین" }
            ].map((service, index) => (
                <div key={index} className="p-6 rounded-3xl border border-emerald-100 bg-white/50 backdrop-blur-sm transition-all hover:shadow-lg dark:border-emerald-900/50 dark:bg-slate-900/40">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center text-2xl justify-center mb-4 text-emerald-600 dark:text-emerald-400 font-bold">
                        {new Intl.NumberFormat("fa-IR").format(index+1)}
                    </div>
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-50 mb-2">{service.title}</h3>
                    <p className="text-sm text-emerald-950/70 dark:text-emerald-50/70 leading-relaxed">{service.desc}</p>
                </div>
            ))}
        </div>
    </section>

  )
}

export default DoctorServices