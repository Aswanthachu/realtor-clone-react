import React from 'react';

import { FcGoogle } from "react-icons/fc";


const OAuth = () => {
    return (
        <div className='w-full rounded bg-red-600 py-3 flex  justify-center hover:bg-red-700 active:bg-red-800 transition ease-in-out duration-150'>
            <button className=' uppercase text-sm text-white font-semibold flex items-center'>
                <FcGoogle className='bg-white rounded-full h-6 w-6 mr-2'/>
                continue with google
            </button>
        </div>

    )
}

export default OAuth;