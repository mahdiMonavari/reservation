import Abilities from "@/components/templates/index/abilities/Abilities"
import Hero from "@/components/templates/index/hero/Hero"
import ReservationRoadMap from "@/components/templates/index/reservationRoadMap/ReservationRoadMap"
async function page() {
  return (
    <>
    <div className="h-screen  bg-hero-phone xl:bg-hero-desctop pt-20 flex items-center">
      <div className='container'>
      <Hero/>
      </div>
    </div>
    <div className="space-y-20 bg-zinc-100 dark:bg-zinc-800 dark:text-white mb-1000 pt-20">
      <div className="container">
        <Abilities/>
        <ReservationRoadMap/>
      </div>        
    </div>    
    </>
  )
}

export default page