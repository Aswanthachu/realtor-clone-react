import React, { useState } from 'react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
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
  };

  const onSubmit=(e)=>{
    e.preventDefault();

    const auth = getAuth();
    try {
      const userCredential=signInWithEmailAndPassword(auth,formData.email,formData.password);
      if(userCredential){
        console.log(userCredential);
        navigate("/")
      }
    } catch (error) {
      toast.error("Bad user credentials",{
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
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
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
                className='w-full px-3 py-2 text-xl rounded text-gray-700 bg-white border-gray-300 transition ease-in-out'
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
              <p>Don't have a account?
                <Link to='/signup' className='text-red-600 hover:text-red-700 transition ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to='/forget' className='text-blue-600 hover:text-blue-800 transition ease-in-out'>Forgot Password?</Link>
              </p>
            </div>
            <div className='mt-6 w-full bg-blue-600 p-3 rounded text-sm font-semibold hover:bg-blue-700 active:bg-blue-800'>
              <button className='w-full text-white uppercase'>signin</button>
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

export default SignIn