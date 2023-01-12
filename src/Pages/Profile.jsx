import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuth, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
    <section className=' flex justify-center flex-col items-center'>
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
        <div className='flex w-full sm:w-[90%] md:w-[50%] mx-auto justify-between mt-6 whitespace-nowrap text-sm  sm:text-lg font-semibold'>
          <p>Do you want to change your name?<span className='text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer'
            onClick={handleSubmit}>{!changeDetails ? "Edit" : "Apply Change"}</span></p>
          <p onClick={LogOut} className='text-blue-600 hover:text-blue-800 cursor-pointer'>Sign out</p>
        </div>
      </form>
    </section>
  )
}

export default Profile;