import React from 'react';
import { decodeToken } from '../api/decodeToken';
import { Navigate } from 'react-router-dom';

const ManagerRoute = ({ children}) =>   {
    const token = localStorage.getItem('token');

    const user = decodeToken(token);

    if(!token || user?.jobPosition !== 'Manager'){
        return <Navigate to="/Login" replace={true} />
    }
    return children;
};

export default ManagerRoute;