import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from 'react'
import { AuthContext } from '../AuthContext.jsx'
import {
    ArrowLeftIcon,
    BriefcaseIcon,
    CalendarIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    ScaleIcon,
    LinkIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";

const IntExpDetailPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInterviewDetails = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
                const { data } = await axios.get(`${BASE_URL}/api/interview/${id}`);
                setInterview(data);
            } catch (err) {
                setError("Failed to load interview details.");
            } finally {
                setLoading(false);
            }
        };
        fetchInterviewDetails();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            <div className="max-w-4xl mx-auto animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-24 mb-8"></div>
                <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-2xl">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center text-blue-600 hover:text-blue-700 transition-all cursor-pointer"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back to Listings
                </button>

                {/* Main Card */}
                {interview && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 transition-all hover:shadow-2xl">
                        {/* Header Section */}
                        <div className="mb-8 text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {interview.companyName}
                            </h1>
                            <div className="flex items-center justify-center space-x-4">
                                <span className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm">
                                    {interview.role}
                                </span>
                                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm">
                                    {interview.jobType}
                                </span>
                            </div>
                        </div>

                        {/* Grid Layout */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <UserCircleIcon className="w-8 h-8 text-blue-500 mr-4" />
                                    <div>
                                        <p className="text-sm text-gray-500">Position / Role</p>
                                        <p className="font-semibold text-gray-800">{interview.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <MapPinIcon className="w-8 h-8 text-green-500 mr-4" />
                                    <div>
                                        <p className="text-sm text-gray-500">Probable Work Location</p>
                                        <p className="font-semibold text-gray-800">{interview.city || "As Per Business"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <CurrencyDollarIcon className="w-8 h-8 text-yellow-500 mr-4" />
                                    <div>
                                        <p className="text-sm text-gray-500">Salary</p>
                                        <p className="font-semibold text-gray-800">{interview.salary}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <CalendarIcon className="w-8 h-8 text-red-500 mr-4" />
                                    <div>
                                        <p className="text-sm text-gray-500">Interviewed Date</p>
                                        <p className="font-semibold text-gray-800">
                                            {new Date(interview.interviewDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ScaleIcon className="w-8 h-8 text-purple-500 mr-4" />
                                    <div>
                                        <p className="text-sm text-gray-500">Difficulty</p>
                                        <p className="font-semibold text-gray-800">{interview.interviewDifficulty}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <BriefcaseIcon className="w-8 h-8 text-orange-500 mr-4" />
                                    <div>
                                        <p className="text-sm text-gray-500">Rounds</p>
                                        <p className="font-semibold text-gray-800">{interview.interviewRounds}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview Process Breakdown</h2>
                            <div
                                className="prose max-w-none bg-gray-50 rounded-xl p-6 border border-gray-200"
                                dangerouslySetInnerHTML={{ __html: interview.interviewRoundsDescription || '<p>No additional details provided.</p>' }}
                            />
                        </div>

                        {/* LinkedIn Section */}
                        {interview.linkedinUrl && (
                            <div className="border-t border-gray-200 pt-6">
                                <a
                                    href={interview.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full hover:bg-blue-200 transition-all"
                                >
                                    <LinkIcon className="w-5 h-5 mr-2" />
                                    View LinkedIn Profile
                                </a>
                            </div>
                        )}

                        <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
                            <span className="text-white text-3xl mr-3">❤️</span>
                            <div className="text-white text-xl">
                                Special Thanks To <span className="font-bold text-yellow-300">{user.name}</span> for Contributing
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default IntExpDetailPage;