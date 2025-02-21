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

            <Link to={'/feature'} className="flex bg-white w-fit py-1 px-3 rounded-full border-2 border-amber-300 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                </svg>
                Back
            </Link>

            <nav className='flex justify-center space-x-4 mt-4'>
                <Link to={'/roomfinder'} className={`px-4 py-2 rounded-md ${path === '/roomfinder' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    Available Rooms
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