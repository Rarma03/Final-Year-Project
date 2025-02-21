import React, { useContext } from 'react';
import MainNavBar from '../MainNavBar/MainNavBar';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import MyJobPostPage from './Adders/MyJobPostPage';
import AllJobPage from './Adders/AllJobPage';

const JobPostPage = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="flex flex-col min-h-screen">
            <MainNavBar />

            <Link
                to={'/feature'}
                className="flex bg-white w-fit py-1 px-3 rounded-full border-2 border-amber-300 ml-4 mt-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                    />
                </svg>
                Back
            </Link>

            <nav className="flex justify-center space-x-4 mt-4">
                <Link
                    to={'/jobs'}
                    className={`px-4 py-2 rounded-md ${path === '/jobs' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    All Job
                </Link>
                {user && (
                    <Link
                        to={'/jobs/myjobpost'}
                        className={`px-4 py-2 rounded-md ${path === '/jobs/myjobpost' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        My Posted Job
                    </Link>
                )}
            </nav>

            <div className="flex-grow p-4">
                {path === '/jobs' && <AllJobPage />}
                {path === '/jobs/myjobpost' && <MyJobPostPage user={user} />}
            </div>
        </div>
    );
};

export default JobPostPage;