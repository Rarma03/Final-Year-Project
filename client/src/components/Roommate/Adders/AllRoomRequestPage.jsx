import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllRoomRequestPage = () => {
    const [flatRequests, setFlatRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlatRequests = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
                const response = await axios.get(`${BASE_URL}/api/flat`);
                setFlatRequests(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFlatRequests();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-xl text-red-500">
                ⚠️ Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    🏢 Available Housing
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {flatRequests.map(flat => (
                        <div
                            key={flat._id}
                            className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-white/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-2xl opacity-30"></div>
                            <div className="relative">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">🏠</span>
                                    {flat.name}
                                </h2>

                                <div className="space-y-4 text-gray-600">
                                    <div className="flex items-center">
                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                            📝 Description
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mb-4">{flat.description}</p>

                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <a
                                            href={flat.location}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                        >
                                            View on Map →
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm">👤 Gender</span>
                                            <span className="font-medium">{flat.genderPreference}</span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-sm">💵 Rent</span>
                                            <span className="font-bold text-green-600">&#8377; {flat.rent}</span>
                                        </div>

                                        <div className="col-span-2">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-medium">
                                                    Move In: {new Date(flat.moveInDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Contact Information</h3>
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span className="font-medium text-gray-700">{flat.contactInfo}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllRoomRequestPage;