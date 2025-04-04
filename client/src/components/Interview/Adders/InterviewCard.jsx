import React from 'react';
import { Link } from 'react-router-dom';
import {
    BriefcaseIcon,
    CalendarIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    LinkIcon
} from '@heroicons/react/24/outline';

const InterviewCard = ({ Expdata, user }) => {
    const {
        companyName,
        role,
        interviewRounds,
        interviewDate,
        salary,
        interviewDifficulty,
        city,
        jobType,
        linkedinUrl,
        createdAt,
    } = Expdata || {};

    const difficultyColors = {
        Easy: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Hard: 'bg-red-100 text-red-800',
        Difficult: 'bg-purple-100 text-purple-800'
    };

    return (
        <Link
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-50 hover:border-blue-100 overflow-hidden flex flex-col h-full"
            to={`/interviews/${companyName}/${Expdata._id}`}
        >
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 pb-4 relative">
                <div className="absolute right-4 top-4 flex items-center space-x-2">
                    <span className={`${difficultyColors[interviewDifficulty] ?? 'bg-gray-100 text-gray-800'} 
                    px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                        <ChartBarIcon className="w-4 h-4 mr-1.5" />
                        {interviewDifficulty}
                    </span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-1">{companyName}</h3>
                <p className="text-lg text-gray-600 font-medium">{role}</p>

                <div className="mt-4 flex items-center space-x-3">
                    <span className="bg-blue-500/10 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <BriefcaseIcon className="w-4 h-4 mr-1.5" />
                        {jobType}
                    </span>
                    <span className="bg-amber-500/10 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <CurrencyDollarIcon className="w-4 h-4 mr-1.5" />
                        {salary}
                    </span>
                </div>
            </div>

            {/* Timeline-style Content */}
            <div className="p-6 flex-grow space-y-4 relative">
                {/* Vertical Line with lower z-index */}
                <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gray-100 group-hover:bg-blue-100 transition-colors z-0"></div>

                {/* Timeline Items */}
                <div className="flex items-start relative z-10">
                    <div className="w-10 mr-4 flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <CalendarIcon className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Interview Date</p>
                        <p className="font-medium text-gray-800">
                            {new Date(interviewDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                <div className="flex items-start relative z-10">
                    <div className="w-10 mr-4 flex-shrink-0">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <MapPinIcon className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Work Location</p>
                        <p className="font-medium text-gray-800">{city}</p>
                    </div>
                </div>

                <div className="flex items-start relative z-10">
                    <div className="w-10 mr-4 flex-shrink-0">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <ChartBarIcon className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Process Rounds</p>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">{interviewRounds}</span>
                            <div className="flex space-x-1">
                                {[...Array((interviewRounds % 10))].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-blue-200 rounded-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>Posted {new Date(createdAt).toLocaleDateString()}</span>
                </div>
                {linkedinUrl && (
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600 flex items-center text-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <LinkIcon className="w-4 h-4 mr-1.5" />
                        Profile
                    </a>
                )}
            </div>
        </Link>
    );
};

export default InterviewCard;