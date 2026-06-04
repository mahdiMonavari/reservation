import Hero from "@/components/templates/index/hero/Hero"
async function page() {
  return (
    <>
    <div className="h-screen  bg-hero-phone xl:bg-hero-desctop pt-20 flex items-center">
      <div className='container'>
      <Hero/>
    </div>
    </div>
    </>
  )
}

export default page