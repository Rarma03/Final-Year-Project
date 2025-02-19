import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext.jsx";

const BookStatusPage = () => {
    const { user } = useContext(AuthContext);
    const [pendingBooks, setPendingBooks] = useState([]);

    // Fetch pending books based on teacher's subjects from DataModel
    useEffect(() => {
        const fetchPendingBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/book/pending/${user._id}`);
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
            const response = await axios.put(`http://localhost:5000/api/book/${bookId}/status`, {
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
            <h1 className="text-xl font-bold mb-4">Pending Book Requests</h1>
            {pendingBooks.length === 0 ? (
                <p>No pending books to review.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingBooks.map((book) => (
                        <div key={book._id} className="border p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p>Subject: {book.subject}</p>
                            <div className="mt-2 flex space-x-2">
                                <button
                                    onClick={() => window.open(book.driveLink, "_blank")}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => updateBookStatus(book._id, 1)}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => updateBookStatus(book._id, 2)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
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