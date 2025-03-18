import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNavBar from '../MainNavBar/MainNavBar';
import { FiMessageSquare, FiChevronLeft, FiClock, FiSend, FiUser, FiCornerUpLeft } from 'react-icons/fi';
import { AuthContext } from '../AuthContext.jsx'

const PostDetailPage = () => {
    const { user } = useContext(AuthContext);
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
    const [replyTo, setReplyTo] = useState(null); // stores the _id of the comment being replied to
    const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;

    // Fetch post and comments using API calls
    useEffect(() => {
        axios.get(`${BASE_URL}/api/community/${postId}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(err => console.error(err));

        axios.get(`${BASE_URL}/api/comments/${postId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(err => console.error(err));
    }, [postId, BASE_URL]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentInput.trim()) return;

        const newCommentData = {
            content: commentInput,
            createdBy: user._id, // Replace with actual user id from context in production
            isAnonymous: isCommentAnonymous,
            parentId: replyTo || null
        };

        axios.post(`${BASE_URL}/api/comments/${postId}`, newCommentData)
            .then(response => {
                setComments([...comments, response.data]);
                setCommentInput('');
                setIsCommentAnonymous(false);
                setReplyTo(null);
            })
            .catch(err => console.error(err));
    };

    // Recursively render comments and replies
    const renderComments = (parentId = null, level = 0) => {
        const filteredComments = comments.filter(comment => comment.parentId === parentId);
        return filteredComments.map(comment => (
            <div key={comment._id} className={`mt-4 ${level > 0 ? "ml-8" : ""}`}>
                <div className="flex gap-4 group">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <FiUser className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                                {comment.isAnonymous ? "Anonymous User" : comment.createdBy?.name || "Anonymous User"}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <FiClock className="w-3 h-3" />
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                        <button
                            onClick={() => setReplyTo(comment._id)}
                            className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1"
                        >
                            <FiCornerUpLeft className="w-4 h-4" /> Reply
                        </button>
                    </div>
                </div>
                {renderComments(comment._id, level + 1)}
            </div>
        ));
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50">
                <MainNavBar />
                <div className="max-w-3xl mx-auto px-4 pt-20 pb-24">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <MainNavBar />
            <div className="max-w-3xl mx-auto px-4 pt-20 pb-24">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-gray-600 hover:text-blue-500 transition-colors"
                >
                    <FiChevronLeft className="mr-2" />
                    Back to Community
                </button>

                {/* Post Detail Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <FiMessageSquare className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
                            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className={`px-3 py-1 rounded-full 
                    ${post.tag === 'Q&A' ? 'bg-blue-100 text-blue-800' : ''}
                    ${post.tag === 'Advice' ? 'bg-purple-100 text-purple-800' : ''}
                `}>
                                    {post.tag}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <span className="text-blue-500">{comments.length}</span> Comments
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                        {renderComments(null)}
                    </div>
                </div>
            </div>

            {/* Fixed Comment Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <form onSubmit={handleCommentSubmit} className="relative">
                        <div className="flex gap-4 mb-2">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                            >
                                <FiSend className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="anonymousComment"
                                checked={isCommentAnonymous}
                                onChange={(e) => setIsCommentAnonymous(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="anonymousComment" className="text-sm text-gray-700">
                                Post comment anonymously
                            </label>
                            {replyTo && (
                                <span className="text-sm text-blue-500 ml-4">
                                    Replying to comment #{replyTo}
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostDetailPage;