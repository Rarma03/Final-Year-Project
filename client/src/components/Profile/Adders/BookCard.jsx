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

    // Calculate a random color once when component mounts
    const [borderColor] = useState(randomColor());

    return (
        <div
            key={book._id}
            style={{ borderLeft: `10px solid ${borderColor}` }}
            className="bg-white rounded-l-lg shadow-sm border p-4 hover:shadow-md transition-shadow border-t-0"
        >

            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
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