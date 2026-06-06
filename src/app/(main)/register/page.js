"use client"
import RegisterForm from '@/components/templates/register/RegisterForm';
import VerifyNumber from '@/components/templates/register/VerifyNumber';
import{ useState } from 'react';

function Register() {  
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isPhoneVerified ,setIsPhoneVerified] = useState(true)
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4'>
      <div className='w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-emerald-200 dark:border-emerald-700 backdrop-filter backdrop-blur-lg'>
        <h1 className='text-4xl font-Morabba-Bold text-center mb-10 text-emerald-800 dark:text-emerald-400'>
          ثبت نام
        </h1>
        {
          !isPhoneVerified ?
          <VerifyNumber 
            phoneNumber={phoneNumber} 
            setIsPhoneVerified={setIsPhoneVerified} 
            setPhoneNumber={setPhoneNumber}/>
          :<RegisterForm phoneNumber={phoneNumber}/>
        }        
      </div>
    </div>
  );
}

export default Register;
