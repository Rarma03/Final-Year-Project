import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout')
            // Clear user data from local storage or context
            localStorage.removeItem('user')
            navigate('/login')
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return (
        <div className='flex flex-col text-center justify-center items-center h-[300px]'>
            <h2>Access More Features or Leave Early ?</h2>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-amber-800">Logout</button>
        </div>
    )
}

export default LogoutButton