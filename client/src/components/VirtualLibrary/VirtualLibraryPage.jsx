import React, { useState, useEffect } from "react";
import MainNavBar from "../MainNavBar/MainNavBar";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import { FiAlertCircle, FiBook, FiFilter, FiSearch } from "react-icons/fi";
import BookCard from "./Adders/BookCard";
import { useContext } from 'react'
import { AuthContext } from '../AuthContext.jsx'

import { Link } from "react-router-dom";

const VirtualLibraryPage = () => {
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
    // const [filters, setFilters] = useState({ subject: "" });
    const [filters, setFilters] = useState({ subject: "", sort: "" });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination states
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchResults = async (reset = false) => {
        setLoading(true);
        setError(null);
        try {
            // If resetting, start from page 1
            const currentPage = reset ? 1 : page;
            const params = new URLSearchParams({
                q: searchQuery,
                subject: filters.subject,
                sort: filters.sort, // added sort parameter
                page: currentPage,
                limit: 20
            }).toString();

            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            const response = await axios.get(`${BASE_URL}/api/book/search?${params}`);

            if (response.data.success) {
                // If resetting, replace results; otherwise, append them
                setResults(reset ? response.data.data : [...results, ...response.data.data]);
                setPage(currentPage + 1);
                setTotalPages(response.data.pages);
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            if (reset) setResults([]);
        }
        setLoading(false);
    };

    // When search query or filter changes, reset and fetch results
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchResults(true);
        }, 500);
        return () => clearTimeout(delayDebounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, filters.subject]);

    const renderFilters = () => (
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiFilter className="mr-2" /> Filters
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                    </label>
                    <select
                        value={filters.subject}
                        onChange={(e) => {
                            setFilters({ ...filters, subject: e.target.value });
                            setPage(1);
                        }}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Subjects</option>
                        <option value="Database Managment System">Database Management System</option>
                        <option value="Data Structure and Alogrithm">Data Structure & Algorithm</option>
                        {/* Other options as defined in your BookModel enum */}
                    </select>
                </div>

                {/* New Sort by Likes Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort by Likes
                    </label>
                    <select
                        value={filters.sort}
                        onChange={(e) => {
                            setFilters({ ...filters, sort: e.target.value });
                            setPage(1);
                        }}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Default</option>
                        <option value="likes_desc">Most Liked</option>
                        <option value="likes_asc">Least Liked</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderResults = () => {
        if (error)
            return (
                <div className="p-8 text-center text-red-600">
                    <FiAlertCircle className="text-4xl mx-auto mb-4" />
                    <p>Error loading books: {error}</p>
                </div>
            );

        if (loading && results.length === 0)
            return (
                <div className="p-8 text-center text-gray-600">
                    <ImSpinner8 className="animate-spin text-3xl mx-auto mb-4" />
                    <p>Loading books...</p>
                </div>
            );

        if (results.length === 0)
            return (
                <div className="p-8 text-center text-gray-600">
                    <FiBook className="text-4xl mx-auto mb-4" />
                    <p>No books found matching your criteria</p>
                </div>
            );

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((book) => (
                        <BookCard book={book} key={book._id} user={user} />
                    ))}
                </div>
                {page <= totalPages && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => fetchResults(false)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <MainNavBar />
            <div className="min-h-screen bg-white m-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        to="/feature"
                        className="flex bg-white w-fit py-1 px-3 rounded-full border-2 border-amber-300 mb-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="ml-2">Back</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-amber-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search books by title, tags, or subject..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1); // Reset page when query changes
                            }}
                            className="w-full pl-10 pr-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters */}
                        <div className="lg:w-80 flex-shrink-0">{renderFilters()}</div>

                        {/* Results */}
                        <div className="flex-1">{renderResults()}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VirtualLibraryPage;