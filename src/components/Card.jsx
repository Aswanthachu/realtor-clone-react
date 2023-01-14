import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

const Card = () => {
    return (
        <li className='w-full flex justify-evenly  mb-5' >
            <Link className='w-[80%] md:w-[60%] lg:w-[90%] bg-white rounded-b-lg pb-3 shadow-2xl'>
                <div className='w-full h-[160px] rounded relative rounded-t-2xl'>
                    <img
                        src='data:image/jpeg;base64,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'
                        alt="card"
                        loading='lazy'
                        className='w-[100%] h-[100%] rounded-t-lg object-cover hover:scale-105 min-w-[200px]'
                    />
                    <div className='bg-blue-500 w-fit text-white p-1 rounded-md uppercase absolute top-2 left-2'>
                        <h4 className='text-xs font-semibold truncate'>A month ago</h4>
                    </div>
                </div>
                <div className='flex flex-col px-2  min-w-[200px]'>
                    <div className='mt-2 flex items-center'  >
                        <IoLocationSharp className='text-green-600 w-6 h-6' />
                        <h5 className='text-xs font-semibold ml-1 truncate'>Flat No:13126 Prestige Jindal City,Bengaluru</h5>
                    </div>
                    <h3 className='text-lg font-semibold flex mt-1'>Luxury Flat with pool..</h3>
                    <h3 className='text-blue-400 font-semibold flex flex-start mt-2'>$1850 / Month</h3>
                    <div className='w-full flex justify-between items-center mt-2'>
                        <div className='font-bold text-sm text-blue-900'>
                            <span className='mr-3'>5 Beds</span>
                            <span>3 Baths</span>
                        </div>
                        <div className='flex justify-between'>
                            <MdEdit className='mr-1' />
                            <MdDelete className='text-red-600' />
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default Card