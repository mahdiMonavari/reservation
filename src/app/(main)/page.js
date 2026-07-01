import CommentSection from "@/components/templates/index/CommentSection/CommentSection";
import Abilities from "@/components/templates/index/abilities/Abilities";
import Hero from "@/components/templates/index/hero/Hero";
import ReservationRoadMap from "@/components/templates/index/reservationRoadMap/ReservationRoadMap";
import serviceModel from "../../../model/service";
import EmptySection from "@/components/modules/emptyState/EmptySection";

export const metadata = {
  title: "کلینیک تخصصی زنان و زایمان | هوموپاتی و طب مکمل",
  description:
    "کلینیک تخصصی زنان، زایمان، نازایی و جراحی‌های درمانی با بیش از ۳۵ سال سابقه. ارائه خدمات هوموپاتی، الوکولوتراپی، لیزر درمانی و زیبایی، فشیال و زایمان فیزیولوژیک.",
  keywords: [
    "کلینیک زنان",
    "زایمان فیزیولوژیک",
    "نازایی",
    "هوموپاتی",
    "الوکولوتراپی",
    "لیزر زیبایی",
    "جراحی زیبایی",
    "طب مکمل",
    "IUD",
    "تعیین جنسیت",
    "فشیال",
    "رزرو نوبت آنلاین",
  ],
  openGraph: {
    title: "کلینیک تخصصی زنان و زایمان",
    description:
      "بیش از ۳۵ سال تجربه در حوزه زنان، زایمان، نازایی و طب مکمل. رزرو آنلاین نوبت در کمترین زمان.",
    url: "https://your-domain.com",
    type: "website",
    locale: "fa_IR",
    siteName: "کلینیک تخصصی زنان",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: "کلینیک تخصصی زنان و زایمان",
      description: "کلینیک تخصصی زنان، زایمان و طب مکمل با بیش از ۳۵ سال سابقه",
      medicalSpecialty: ["Obstetrics", "Gynecology", "ReproductiveMedicine"],
      url: "https://your-domain.com",
    }),
  },
};

async function page() {
  const services = await serviceModel.find({ isPopular: "true" });
  return (
    <>
      <div className="h-screen overflow-x-hidden bg-hero-phone xl:bg-hero-desctop pt-20 flex items-center">
        <div className="container">
          <Hero />
        </div>
      </div>
      <div className="space-y-20 overflow-x-hidden bg-zinc-100 dark:bg-zinc-800 dark:text-white pt-20">
        <div className="container">
          {services.length ? (
            <Abilities services={JSON.parse(JSON.stringify(services))} />
          ) : (
            <EmptySection title="هنوز دکتری خدمت محبوبی اضافه نکرده است" />
          )}
        </div>
        <div className="container">
          <ReservationRoadMap />
        </div>
        <CommentSection />
      </div>
    </>
  );
}

export default page;
