import React from 'react'
import MainNavBar from '../MainNavBar/MainNavBar'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext.jsx'
import { useLocation, Link } from 'react-router-dom'
import MyRoomRequestPage from './Adders/MyRoomRequestPage.jsx'
import AllRoomRequestPage from './Adders/AllRoomRequestPage.jsx'

const RoomMatePage = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const path = location.pathname;

    return (
        // Send the GET request to /api/flat to get all flat-requests
        <div className='flex flex-col min-h-screen'>
            <MainNavBar />

            <nav className='flex justify-center space-x-4 mt-4'>
                <Link to={'/roomfinder'} className={`px-4 py-2 rounded-md ${path === '/roomfinder' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    All Flat Requests
                </Link>
                {
                    user &&
                    <Link to={'/roomfinder/myroomrequest'} className={`px-4 py-2 rounded-md ${path === '/roomfinder/myroomrequest' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        My Room Requests
                    </Link>
                }
            </nav>

            {/* Add content here */}
            <div className='flex-grow p-4'>
                {/* Content based on the route */}
                {path === '/roomfinder' && <AllRoomRequestPage />}
                {path === '/roomfinder/myroomrequest' && <MyRoomRequestPage user={user} />}
            </div>
        </div>
    )
}

export default RoomMatePage