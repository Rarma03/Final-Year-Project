import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const BookMarkPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    // Assuming the logged-in user is stored in localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        const fetchBookmarks = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
                const response = await axios.get(`${BASE_URL}/api/commonData/bookmarks/${user._id}`);
                if (response.data.success) {
                    setBooks(response.data.data.booksBookmark);
                }
            } catch (error) {
                console.error("Error fetching bookmarks:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Please login to view bookmarks.</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Bookmarks</h2>
            {books.length === 0 ? (
                <div>No bookmarks found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookMarkPage;