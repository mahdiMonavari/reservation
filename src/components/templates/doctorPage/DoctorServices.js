import React from 'react'
import DoctorService from './DoctorService'

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
             <DoctorService key={index}  service={service}  index={index}/>
            ))}
        </div>
    </section>

  )
}

export default DoctorServices