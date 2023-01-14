import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { FcHome } from "react-icons/fc"

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const [changeDetails, setChangeDetails] = useState(false);

  const { name, email } = formData;

  const LogOut = () => {
    auth.signOut();
    navigate('/');
  }

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmit = async () => {
    setChangeDetails(prevState => !prevState);

    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });

        // update name on firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name
        });
        toast.success("Profile details updated successfully..", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Could not update name of user", {
        position: "bottom-center",
        autoClose: 2000,
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
    <section className=' flex justify-center flex-col items-center max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mt-6'>My Profile</h1>
      <form className='w-full max-w-6xl m-6 flex flex-col p-3'>
        <input type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
          disabled={!changeDetails}
          className={`w-full sm:w-[90%] md:w-[50%] rounded   mx-auto bg-white border-gray-500 transition ease-in-out p-3 mb-6 ${changeDetails && "bg-red-200"}`} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          disabled
          className={`w-full sm:w-[90%] md:w-[50%] rounded  mx-auto  bg-white border-gray-500 transition ease-in-out p-3`} />
        <div className='flex w-full sm:w-[90%] md:w-[50%]  mx-auto justify-between mt-6 whitespace-nowrap text-sm  sm:text-lg font-semibold'>
          <p>Do you want to change your name?<span className='text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer'
            onClick={handleSubmit}>{!changeDetails ? "Edit" : "Apply Change"}</span></p>
          <p onClick={LogOut} className='text-blue-600 hover:text-blue-800 cursor-pointer'>Sign out</p>
        </div>

        <button type='button' className='w-full mt-10 mx-auto flex items-center justify-center  p-3 bg-blue-600  rounded text-sm font-semibold text-white uppercase transition ease-in-out duration-150 hover:bg-blue-800 sm:w-[90%]  md:w-[50%]'>
          <Link to="/create-listing" className='flex items-center justify-center w-full'>
            <span className='bg-pink-300 w-6 h-6 rounded-full flex items-center justify-center border-white border-[2px] mr-2'>
              <FcHome />
            </span>
            sell or rent your home
          </Link>
        </button>
      </form>
      <h2 className='font-semibold text-2xl' >My Listings</h2>
      <div className='w-full flex justify-start'>
        <div className='w-[20%] h-[160px] rounded relative'>
          <img
            src='data:image/jpeg;base64,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'
            alt="card"
            className='w-[100%] h-[100%] rounded-t-lg'
          />
          <div className='bg-blue-500 w-fit text-white p-1 rounded-md uppercase absolute top-2 left-2'>
            <h4 className='text-xs font-semibold'>A month ago</h4>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Profile;