import CommentSection from "@/components/templates/index/CommentSection/CommentSection";
import Abilities from "@/components/templates/index/abilities/Abilities";
import Hero from "@/components/templates/index/hero/Hero";
import ReservationRoadMap from "@/components/templates/index/reservationRoadMap/ReservationRoadMap";
import serviceModel from "../../../model/service";
import EmptySection from "@/components/modules/emptyState/EmptySection";
async function page() {
  const services = await serviceModel.find({ isPopular: "true" });
  console.log(services);
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
