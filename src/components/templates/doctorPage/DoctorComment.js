function DoctorComment() {
  return (
    <section className="container py-16">
    <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50 mb-8">نظرات مراجعین</h2>
    
    <div className="space-y-6">
        {[
            { name: "سارا احمدی", date: "۲ هفته پیش", comment: "بسیار باحوصله و متخصص. توضیحاتشون کاملاً واضح بود و استرس من رو خیلی کم کردن.", rate: 5 },
            { name: "مریم رضایی", date: "۱ ماه پیش", comment: "بهترین پزشکی که تا حالا مراجعه کردم. واقعاً برای بیمار وقت میذارن.", rate: 5 }
        ].map((item, index) => (
            <div key={index} className="flex gap-4 p-6 rounded-3xl border border-emerald-100 bg-white/70 dark:border-emerald-900/50 dark:bg-slate-900/30">
                <div className="w-12 h-12 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center font-bold text-emerald-700 dark:text-emerald-200">
                    {item.name[0]}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-emerald-900 dark:text-emerald-50">{item.name}</h4>
                        <span className="text-xs text-emerald-600/60">{item.date}</span>
                    </div>
                    <p className="text-sm text-emerald-950/80 dark:text-emerald-50/80">{item.comment}</p>
                </div>
            </div>
        ))}
    </div>
</section>

  )
}

export default DoctorComment