import DoctorPage from '@/components/templates/doctorPage/DoctorPage';

async function page({params}) {
    const { id } = await params; 
  return (
    <div className='min-h-screen pt-21 bg-gray-100 dark:bg-zinc-800'>
        <DoctorPage/>
    </div>
  )
}

export default page