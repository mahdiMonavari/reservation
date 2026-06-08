import DoctorCard from "./DoctorCard"
import DoctorComment from "./DoctorComment"
import DoctorServices from "./DoctorServices"
function DoctorPage() {
  return (    
    <div className='container my-20'>
        <DoctorCard/>
        <DoctorServices/>
        <DoctorComment/>
    </div>
  )
}

export default DoctorPage
