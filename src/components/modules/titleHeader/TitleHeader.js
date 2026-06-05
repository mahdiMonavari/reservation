
function TitleHeader({title}) {
  return (
    <h2 className='mb-5 text-3xl text-center dark:text-emerald-400 text-emerald-900 font-Morabba-Bold relative'>
        {title}
        <span className='absolute -bottom-5 left-1/2 -translate-x-1/2 w-1/12 h-2 rounded-full bg-emerald-900 dark:bg-emerald-400'></span>
    </h2>
  )
}

export default TitleHeader