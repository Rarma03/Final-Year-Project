import React from 'react';

const UpperSectionPage = ({ username }) => {
    const userName = username;
    const bookCount = 10;
    const discussionCount = 5;
    const fundRaisingCount = 2;

    return (
        <div className="flex flex-col md:flex-row bg-white p-4 border border-amber-400 rounded-tl-3xl rounded-tr-full shadow-md items-center md:items-start">
            {/* Profile Icon */}
            <div className="flex justify-center md:justify-start w-full md:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-20 w-20 md:h-[100px] md:w-[100px]">
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'orange', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'pink', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path fill="url(#gradient1)" strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>

            {/* Divider - Hidden on small screens */}
            <div className="hidden md:block border-l-2 border-white h-full mx-4"></div>

            {/* User Info */}
            <div className="text-center md:text-left mt-4 md:mt-0">
                <div className="text-lg font-medium">
                    Welcome, <strong className="text-amber-500">{userName}</strong>
                </div>
                <div className="flex flex-col mt-2 space-y-1 text-sm text-gray-700">
                    <p>📚 Total Books/Notes Uploaded: <strong>{bookCount}</strong></p>
                    <p>💬 Discussions: <strong>{discussionCount}</strong></p>
                    <p>🤝 Fundraising Requests: <strong>{fundRaisingCount}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default UpperSectionPage;