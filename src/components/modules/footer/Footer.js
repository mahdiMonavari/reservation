
import Link from "next/link";
import MembershipNewsletter from "./MembershipNewsletter";

function Footer() {
        
  return (
    <div  className='container dark:text-gray-100 flex items-start justify-between py-5'>
        <ul className="space-y-2 text-xl dark:text-gray-100 text-zinc-900 pr-10">
            <li className="relative pr-2">
                <Link href={""}>خانه</Link>
                <span className="absolute top-1/2 -translate-y-1/2 w-3 h-0.5 dark:bg-gray-100 bg-zinc-700 -right-3"></span>
            </li>
            <li className="relative pr-2">
                <Link href={""}>درباره ما</Link>
                <span className="absolute top-1/2 -translate-y-1/2 w-3 h-0.5 dark:bg-gray-100 bg-zinc-700 -right-3"></span>
            </li>
            <li className="relative pr-2">
                <Link href={""}>ارتباط با ما</Link>
                <span className="absolute top-1/2 -translate-y-1/2 w-3 h-0.5 dark:bg-gray-100 bg-zinc-700 -right-3"></span>
            </li>
            <li className="relative pr-2">
                <Link href={""}>دکترها</Link>
                <span className="absolute top-1/2 -translate-y-1/2 w-3 h-0.5 dark:bg-gray-100 bg-zinc-700 -right-3"></span>
            </li>
            <li className="relative pr-2">
                <Link href={""}>رزرونوبت</Link>
                <span className="absolute top-1/2 -translate-y-1/2 w-3 h-0.5 dark:bg-gray-100 bg-zinc-700 -right-3"></span>
            </li>
        </ul>
        <div className="dark:text-gray-100 text-zinc-900">
            <div className="mb-4">
                <h2 className="text-2xl mb-2">آدرس :</h2>
                <p>
                    دولت آباد خیابان طالقانی پست اداره پست 
                </p>            
            </div>
            <div className="mb-4">
                <h2 className="text-2xl mb-2">شماره تماس :</h2>
                <p>
                    09131050649
                </p>            
            </div>
        </div>
        <div>
            <h3 className="text-2xl mb-3 dark:text-gray-100 text-zinc-900">عضویت در خبرنامه</h3>
            <MembershipNewsletter/>
        </div>        
    </div>
  )
}

export default Footer