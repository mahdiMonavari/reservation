import TitleHeader from "@/components/modules/titleHeader/TitleHeader"
import Doctor from "./Doctor"

function Doctors() {
  return (
    <div className="mt-20 mb-20">
        <TitleHeader title={"لیست متخصصین"}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-20 container">
            <Doctor/>
            <Doctor/>
            <Doctor/>
        </div>
    </div>
  )
}

export default Doctors