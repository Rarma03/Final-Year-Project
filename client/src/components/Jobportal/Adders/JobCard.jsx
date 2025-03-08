import React from 'react';
import { FiBriefcase, FiDollarSign, FiMapPin, FiExternalLink } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job, canDelete, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (jobId) => {
        try {
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            // Pass userId in the request body using axios.delete's `data` option

            const response = await axios.delete(`${BASE_URL}/api/job/jobpost/${jobId}`);

            navigate('/jobs');
            alert('Job Post Deleted');
        } catch (err) {
            console.error('Error deleting job:', err);
            alert('Failed to delete the job post');
        }
    };

    return (
        <div className="relative group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-blue-50 mt-2">
            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{job.companyName}</h3>
                    <p className="text-lg text-blue-600 font-medium">{job.role}</p>
                </div>
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    New
                </span>
            </div>

            {/* Job Description */}
            <p className="text-gray-600 mb-6 line-clamp-3">{job.jobDescription}</p>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                    <FiBriefcase className="text-blue-600 w-5 h-5" />
                    <span className="text-gray-700">{job.jobType || 'Full-time'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FiDollarSign className="text-green-600 w-5 h-5" />
                    <span className="text-gray-700">{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FiMapPin className="text-red-600 w-5 h-5" />
                    <span className="text-gray-700">{job.city}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 border-t pt-4">
                {job.jobLink && (
                    <a
                        href={job.jobLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Apply Now</span>
                    </a>
                )}
                {job.linkedinUrl && (
                    <a
                        href={job.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-blue-600"
                        >
                            <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
                        </svg>
                        <span>LinkedIn [for referral]</span>
                    </a>
                )}
            </div>
            {canDelete && (
                <button
                    onClick={() => handleDelete(job._id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition duration-200 cursor-pointer"
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default JobCard;