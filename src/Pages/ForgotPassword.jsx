import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit=async (e)=>{
    e.preventDefault();

    const auth=getAuth();
    try {
      const result= await sendPasswordResetEmail(auth,email);
      toast.success("Reset email send successfully..",{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } catch (error) {
      toast.error("Problem with sending reset email",{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.log(error);
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forget Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='w-full  md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
          <img src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
            alt="key"
            className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-8'>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className='w-full px-4 py-2 text-xl rounded text-gray-700 bg-white border-gray-300 transition ease-in-out mb-6'
              placeholder='Email Address'
            />
            <div className='flex justify-between pt-2 whitespace-nowrap text-sm sm:text-lg'>
              <p>Don't have a account?
                <Link to='/signup' className='text-red-600 hover:text-red-700 transition ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to='/signin' className='text-blue-600 hover:text-blue-800 transition ease-in-out'>Sign in instead.</Link>
              </p>
            </div>
            <div className='mt-6 w-full bg-blue-600 p-3 rounded text-sm font-semibold hover:bg-blue-700 active:bg-blue-800'>
              <button className='w-full text-white uppercase' >send reset password</button>
            </div>
            <div className='my-4 flex items-center before:border-t before:flex-1 border-gray-300 after:border-t after:flex-1 border-gray-300'>
              <p className='mx-2'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword