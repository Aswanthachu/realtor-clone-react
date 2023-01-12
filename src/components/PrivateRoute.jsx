import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import {useAuthStatus} from '../hooks/useAuthStatus';

const PrivateRoute = () => {
    const navigate = useNavigate();
    const { loggedIn, checkingStatus } =useAuthStatus();
    if(checkingStatus) return <div>Loading...</div>
    return loggedIn ? <Outlet /> : navigate('/signin');
}

export default PrivateRoute;