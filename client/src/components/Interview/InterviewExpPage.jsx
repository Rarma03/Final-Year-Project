import React, { useState, useEffect, useContext } from "react";
import MainNavBar from "../MainNavBar/MainNavBar";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import { FiAlertCircle, FiSearch } from "react-icons/fi";
import InterviewCard from "./Adders/InterviewCard";
import { AuthContext } from "../AuthContext.jsx";
import { Link } from "react-router-dom";

const InterviewExpPage = () => {
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
    // Using a filter for company and sort order; you can expand filters as needed.
    const [filters, setFilters] = useState({ company: "", sort: "" });
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
            const currentPage = reset ? 1 : page;
            const params = new URLSearchParams({
                q: searchQuery,
                company: filters.company,
                sort: filters.sort,
                page: currentPage,
                limit: 20,
            }).toString();

            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            const response = await axios.get(`${BASE_URL}/api/interview/search?${params}`);

            if (response.data.success) {
                // Reset results if necessary; otherwise, append.
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

    // Fetch results when search query or filters change.
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchResults(true);
        }, 500);
        return () => clearTimeout(delayDebounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, filters.company, filters.sort]);

    const renderFilters = () => (
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                        type="text"
                        value={filters.company}
                        onChange={(e) => {
                            setFilters({ ...filters, company: e.target.value });
                            setPage(1);
                        }}
                        placeholder="Filter by company"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort by Date</label>
                    <select
                        value={filters.sort}
                        onChange={(e) => {
                            setFilters({ ...filters, sort: e.target.value });
                            setPage(1);
                        }}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Default</option>
                        <option value="date_desc">Newest First</option>
                        <option value="date_asc">Oldest First</option>
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
                    <p>Error loading experiences: {error}</p>
                </div>
            );

        if (loading && results.length === 0)
            return (
                <div className="p-8 text-center text-gray-600">
                    <ImSpinner8 className="animate-spin text-3xl mx-auto mb-4" />
                    <p>Loading experiences...</p>
                </div>
            );

        if (results.length === 0)
            return (
                <div className="p-8 text-center text-gray-600">
                    <p>No interview experiences found matching your criteria</p>
                </div>
            );

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((exp) => (
                        <InterviewCard Expdata={exp} key={exp._id} user={user} />
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

                    <div className="mb-8 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-amber-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search interview experiences by title, company, or role..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-80 flex-shrink-0">{renderFilters()}</div>
                        <div className="flex-1">{renderResults()}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InterviewExpPage;