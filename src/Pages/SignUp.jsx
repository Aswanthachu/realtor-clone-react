import React, { useState } from 'react';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(true);

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const handleShow = (e) => {
    setShowPassword(prevState => (
      !prevState
    ))
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user;
      console.log(user);
      // if(user){
      //   console.log("jii");
      //   updateProfile(auth.currentUser, {
      //     displayName: formData.name
      //   });
  
      //   const formDataCopy = { ...formData };
      //   delete formDataCopy.password;
      //   formDataCopy.timestamp = serverTimestamp();
  
      //   await setDoc(doc(db, "users", user.uid), formDataCopy);

      //   navigate('/');
      // }
      toast.success('Registration successful!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate('/')
    } catch (error) {
      toast.error('Something wrong with registration!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
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
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className='w-full px-4 py-2 text-xl rounded text-gray-700 bg-white border-gray-300 transition ease-in-out mb-6'
              placeholder='Name'
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-2 text-xl rounded text-gray-700 bg-white border-gray-300 transition ease-in-out mb-6'
              placeholder='Email Address'
            />
            <div className='relative'>
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className='w-full px-4 py-2 text-xl rounded text-gray-700 bg-white border-gray-300 transition ease-in-out'
                placeholder='Password'
              />
              {showPassword ? <AiFillEye
                className='absolute right-3 top-3 text-xl'
                onClick={handleShow}
              /> :
                <AiFillEyeInvisible
                  className='absolute right-3 top-3 text-xl'
                  onClick={handleShow}
                />}
            </div>
            <div className='flex justify-between pt-6 whitespace-nowrap text-sm sm:text-lg'>
              <p>Have an account?
                <Link to='/signin' className='text-red-600 hover:text-red-700 transition ease-in-out ml-1'>SignIn</Link>
              </p>
              <p>
                <Link to='/forget' className='text-blue-600 hover:text-blue-800 transition ease-in-out'>Forgot Password?</Link>
              </p>
            </div>
            <div className='mt-6 w-full bg-blue-600 p-3 rounded text-sm font-semibold hover:bg-blue-700 active:bg-blue-800'>
              <button className='w-full text-white uppercase' >signup</button>
            </div>
            <div className='my-3 flex items-center before:border-t before:flex-1 border-gray-300 after:border-t after:flex-1 border-gray-300'>
              <p className='mx-2'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp