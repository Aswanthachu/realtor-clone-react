import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';

const Profile = () => {
  const navigate=useNavigate();
  const auth=getAuth();

  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  });

  const {name,email}=formData;

  const LogOut=()=>{
    auth.signOut();
    navigate('/');
  }

  return (
    <section className=' flex justify-center flex-col items-center'>
      <h1 className='text-3xl font-bold mt-6'>My Profile</h1>
      <form className='w-full max-w-6xl m-6 flex flex-col p-3'>
        <input type="text" name="name" placeholder="Name" value={name} className=' w-full sm:w-[90%] md:w-[50%] rounded   mx-auto bg-white border-gray-500 transition ease-in-out p-3 mb-6 '/>
        <input type="email" name="email" placeholder="Email"  value={email} className='w-full sm:w-[90%] md:w-[50%] rounded  mx-auto  bg-white border-gray-500 transition ease-in-out p-3'/>
        <div className='flex w-full sm:w-[90%] md:w-[50%] mx-auto justify-between mt-6 whitespace-nowrap text-sm  sm:text-lg font-semibold'>
          <p>Do you want to change your name?<Link to="/" className='text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 '>Edit</Link></p>
          <p onClick={LogOut} className='text-blue-600 hover:text-blue-800 cursor-pointer'>Sign out</p>
        </div>
      </form>
    </section>
  )
}

export default Profile