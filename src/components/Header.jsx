import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();

    function pathMatchRoute(route) {
        if (route === location.pathname) {
            return true;
        }
    }

    return (
        <div className='w-full bg-white sticky top-0 z-50 shadow-sm border-b'>
            <header className='flex justify-between px-3 max-w-6xl mx-auto align-center'>
                <div className='flex items-center'>
                    <img src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg' alt="realtor-logo"
                        className='h-4 md:h-6 cursor-pointer'
                    />
                </div>
                <div>
                    <ul className='flex justify-center space-x-10'>
                        <li className={`text-sm font-semibold py-4 text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/') && "text-black border-b-red-600"} cursor-pointer`}
                            onClick={() => navigate('/')}
                        >Home
                        </li>
                        <li className={`text-sm font-semibold py-4 text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/offers') && "text-black border-b-red-600"} cursor-pointer`}
                            onClick={() => navigate('/offers')}
                        >Offers
                        </li>
                        <li className={`text-sm font-semibold py-4 text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/signin') && "text-black border-b-red-600"} cursor-pointer`}
                            onClick={() => navigate('/signin')}
                        >Sign In
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header;