import React from 'react';
import LowerSectionPage from './Adders/LowerSectionPage';
import UpperSectionPage from './Adders/UpperSectionPage';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../AuthContext.jsx'

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col h-screen p-5 mb-5">
            <Link to={'/feature'} className='mb-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-amber-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
            </Link>
            <UpperSectionPage user={user} />
            <LowerSectionPage user={user} />
            <div className="mt-5">&nbsp;</div>
        </div>
    );
};

export default ProfilePage;