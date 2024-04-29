import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode for decoding the token

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // If token is not present or invalid, navigate to login page
    if (!token) {
        return navigate('/login')
    }

    // Decode the token to get user role
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    // Redirect based on role
    switch (role) {
        case 'admin':
            return navigate('/adminpage')
        case 'user':
            return navigate('/userpage')
        default:
            console.error('Invalid role:', role);
            // Redirect to a default page or show an error message
            return navigate('/login')
    }
};

export default PrivateRoutes;
