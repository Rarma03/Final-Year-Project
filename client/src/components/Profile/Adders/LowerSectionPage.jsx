import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UploadBookForm from './UploadBookForm';
import CreateFlatRequestForm from './CreateFlatRequestForm';

const LowerSectionPage = ({ user }) => {
    const location = useLocation();
    const pth = location.pathname; // Get current route
    console.log(user);

    return (
        <div className="bg-white flex flex-col md:flex-row flex-1 mt-5 p-4 border border-amber-500 rounded-br-[50px] md:rounded-br-[100px]">
            {/* Left Section (Navigation Links) */}
            <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-300 p-3">
                <nav className="flex flex-col space-y-3">
                    <Link
                        to="/profile/uploadbook"
                        className={`block p-2 rounded-md ${pth === '/profile/uploadbook' ? 'text-orange-500 font-semibold' : 'text-gray-700'}`}
                    >
                        Upload Book/Notes
                    </Link>
                    <Link
                        to="/profile/createflatrequest"
                        className={`block p-2 rounded-md ${pth === '/profile/createflatrequest' ? 'text-orange-500 font-semibold' : 'text-gray-700'}`}
                    >
                        Create Request for Room-mate
                    </Link>
                </nav>
            </div>

            {/* Right Section (Dynamic Content) */}
            <div className="w-full md:w-3/4 p-3">
                {pth === '/' && <p className="text-gray-500">Nothing to show</p>}
                {pth === '/profile/uploadbook' && <div className="text-black"><UploadBookForm userid={user._id} /></div>}
                {pth === '/profile/createflatrequest' && <div className="text-black"><CreateFlatRequestForm /></div>}
            </div>
        </div>
    );
};

export default LowerSectionPage;