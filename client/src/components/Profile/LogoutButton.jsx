import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const [hover, setHover] = useState(false); // Track hover state

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
            <div className="relative">
                <button
                    onClick={handleLogout}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-amber-800"
                >
                    Logout
                </button>
                {hover && (
                    <img
                        src="./sadmouse.gif"
                        alt="Hover GIF"
                        className="absolute top-[-100px] left-0"
                    />
                )}
            </div>
        </div>
    );
};

export default LogoutButton;