import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
                const response = await axios.get(`${BASE_URL}/api/me`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};