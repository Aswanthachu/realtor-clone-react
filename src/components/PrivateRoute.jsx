import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import {useAuthStatus} from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
    const navigate = useNavigate();
    const { loggedIn, checkingStatus } =useAuthStatus();
    if(checkingStatus) return <Spinner />
    return loggedIn ? <Outlet /> : navigate('/signin');
}

export default PrivateRoute;