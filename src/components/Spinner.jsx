import React from 'react';
import spinner from "../assets/svgs/spinner.svg";

const Spinner = () => {
  return (
    <div className='flex items-center justify-center bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 z-40'>
        <div className=''>
            <img src={spinner} alt="loading.." className='w-24 h-24 my-auto'/> 
        </div>
    </div>
  )
}

export default Spinner