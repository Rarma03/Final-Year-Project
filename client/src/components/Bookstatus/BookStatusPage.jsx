import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext.jsx";
import { Link } from 'react-router-dom';

const BookStatusPage = () => {
    const { user } = useContext(AuthContext);
    const [pendingBooks, setPendingBooks] = useState([]);

    // Fetch pending books based on teacher's subjects from DataModel
    useEffect(() => {
        const fetchPendingBooks = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
                const response = await axios.get(`${BASE_URL}/api/book/pending/${user._id}`);
                if (response.data.success) {
                    setPendingBooks(response.data.data);
                } else {
                    console.error("Failed to fetch books:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching books:", error.response?.data || error.message);
            }
        };

        if (user && user._id) {
            fetchPendingBooks();
        }
    }, [user]);

    // Handler to update book status
    const updateBookStatus = async (bookId, status) => {
        try {
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            const response = await axios.put(`${BASE_URL}/api/book/${bookId}/status`, {
                status, // 1 for accepted, 2 for declined
                verifiedBy: user.name,
            });
            if (response.data.success) {
                // Remove updated book from pendingBooks list
                setPendingBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
            } else {
                console.error("Failed to update book status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating book status:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-4">
            <Link to={'/feature'} className="flex bg-white w-fit py-1 px-3 rounded-full border-2 border-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                </svg>
                Back
            </Link>

            <h1 className="text-xl font-bold mb-4 text-center bg-white ">⌛ Pending Book Requests</h1>
            {pendingBooks.length === 0 ? (
                <p>🥳 No pending books to review.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    {pendingBooks.map((book) => (
                        <div key={book._id} className="border p-4 rounded shadow bg-white border-l-5 border-amber-500">
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p>Subject: {book.subject}</p>
                            <div className="mt-2 flex space-x-2">
                                <button
                                    onClick={() => window.open(book.driveLink, "_blank")}
                                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer flex"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    View
                                </button>
                                <button
                                    onClick={() => updateBookStatus(book._id, 1)}
                                    className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                                >
                                    ✅Accept
                                </button>
                                <button
                                    onClick={() => updateBookStatus(book._id, 2)}
                                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookStatusPage;