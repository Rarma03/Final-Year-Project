import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Define randomColor to return one color from an array
const randomColor = () => {
    const colors = ["red", "green", "blue", "purple", "orange", "teal", "pink"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const BookCard = ({ book, user }) => {
    const [likeCount, setLikeCount] = useState(book.likesCount || 0);
    const [hasLiked, setHasLiked] = useState(false);

    // Calculate a random color once when component mounts
    const [borderColor] = useState(randomColor());

    const handleLike = async () => {
        if (!user) return; // Ensure the user is logged in
        try {
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            const response = await axios.patch(`${BASE_URL}/api/book/${book._id}/like`, {
                userId: user._id,
            });
            if (response.data.success) {
                // Update local like count from updated book's likes array length
                setLikeCount(response.data.data.likes.length);
                setHasLiked(true);
            }
        } catch (error) {
            console.error("Error liking book:", error.response?.data || error.message);
        }
    };

    const handleBookmark = async () => {
        if (!user) return;
        try {
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            const response = await axios.patch(`${BASE_URL}/api/book/bookmark`, {
                userId: user._id,
                bookId: book._id,
            });
            if (response.data.success) {
                // Optionally, update the UI or show a success message
                alert("Book bookmarked successfully");
            }
        } catch (error) {
            console.error("Error bookmarking book:", error.response?.data || error.message);
        }
    };

    return (
        <div
            key={book._id}
            style={{ borderLeft: `10px solid ${borderColor}` }}
            className="bg-white rounded-l-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>

                {
                    user &&
                    // bookmark icon
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={handleBookmark}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                }
            </div>

            <div className="space-y-2 text-sm text-gray-600">
                <p>
                    <span className="font-medium">Subject:</span> {book.subject}
                </p>
                <p>
                    <span className="font-medium">Branch:</span> {book.branch}
                </p>
                {book.semester && (
                    <p>
                        <span className="font-medium">Semester:</span> {book.semester}
                    </p>
                )}
                {book.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        Tags :
                        {book.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => window.open(book.driveLink, "_blank")}
                    className="px-4 py-2 bg-amber-300 text-white rounded-md hover:bg-amber-700 flex items-center cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    Open Book
                </button>
                {user && <button
                    onClick={handleLike}
                    disabled={hasLiked}
                    className={`flex items-center text-sm text-red-500 cursor-pointer`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-5 h-5 mr-1`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25"
                        />
                    </svg>
                    {likeCount} {hasLiked ? "Liked" : "Like"}
                </button>}
                {!user && <button
                    onClick={handleLike}
                    disabled={hasLiked}
                    className={`flex items-center text-sm text-red-500 cursor-not-allowed`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-5 h-5 mr-1`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25"
                        />
                    </svg>
                    {likeCount} {hasLiked ? "Liked" : "Like"}
                </button>}
            </div>
            <div className="bg-green-200 flex justify-between mt-2 mb-0 items-center rounded-r-3xl">
                <span className="text-sm text-blue-600">
                    &nbsp;Verified By: {book.verifiedBy || "N/A"}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-600 mr-1"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default BookCard;