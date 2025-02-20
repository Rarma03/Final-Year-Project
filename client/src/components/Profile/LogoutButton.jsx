import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext); // Access AuthContext

    const handleLogout = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;

            // Optional: Send request to backend to invalidate session/token
            // await axios.post(`${BASE_URL}/api/auth/logout`);

            // Clear user data from context and localStorage
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem('user');

            // Redirect to feature page
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='flex flex-col text-center justify-center items-center h-[300px]'>
            <h2>Access More Features or Leave Early?</h2>
            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-amber-800"
            >
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;