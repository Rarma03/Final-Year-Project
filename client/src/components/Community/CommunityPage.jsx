import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNavBar from '../MainNavBar/MainNavBar';
import {
    FiMessageSquare, FiHash, FiPlus, FiX, FiChevronRight, FiEdit3,
    FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import { AuthContext } from '../AuthContext.jsx';

const CommunityPage = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;

    // Fetch posts from the backend using Axios
    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/community`)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((err) => console.error(err));
    }, [BASE_URL]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titleInput.trim() || !descriptionInput.trim()) return;
        if (!user) {
            alert('Please log in to create a post.');
            return;
        }

        const newPostData = {
            title: titleInput,
            content: descriptionInput,
            tag: selectedTag || 'Q&A',
            createdBy: user._id,
            isAnonymous: isAnonymous
        };

        axios
            .post(`${BASE_URL}/api/community`, newPostData)
            .then((response) => {
                setPosts([response.data, ...posts]);
                setTitleInput('');
                setDescriptionInput('');
                setSelectedTag(null);
                setIsAnonymous(false);
                setShowForm(false);
            })
            .catch((err) => console.error(err));
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };

    const handleVote = (postId, type) => {
        if (!user) {
            alert('Please log in to vote.');
            return;
        }
        axios
            .patch(`${BASE_URL}/api/community/${postId}/${type}`, { userId: user._id })
            .then((response) => {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId ? { ...post, ...response.data } : post
                    )
                );
            })
            .catch((err) => console.error(err));
    };

    const trendingPosts = [...posts]
        .sort((a, b) => (b.upvote?.length || 0) - (a.upvote?.length || 0))
        .slice(0, 5);
    const mainPosts = posts;

    return (
        <>
            {/* Render MainNavBar separately to avoid background interference */}
            <MainNavBar />

            <div className="min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200 relative">
                <div className="max-w-7xl mx-auto px-4 pt-20 pb-24">
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

                    {/* Header Section */}
                    <div className="mb-12 text-center">
                        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-2xl mb-6">
                            <h1 className="text-4xl font-bold text-white px-8 py-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                                <FiMessageSquare className="inline-block mr-3 -mt-1" />
                                Community Hub
                            </h1>
                        </div>
                        <p className="text-gray-600 text-lg font-light">
                            Connect, collaborate, and grow with fellow developers
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Trending Sidebar */}
                        <div className="lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20">
                                <h2 className="text-xl font-bold mb-4 flex items-center">
                                    <FiChevronRight className="text-blue-500 mr-2" />
                                    Trending Discussions
                                </h2>
                                <div className="space-y-4">
                                    {trendingPosts.map((post) => (
                                        <div
                                            key={post._id}
                                            onClick={() => navigate(`/post/${post._id}`)}
                                            className="group relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100/50 hover:border-blue-100"
                                        >
                                            <div className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center">
                                                <FiMessageSquare className="mr-1" />
                                                {post.comments?.length || 0}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span
                                                    className={`text-xs font-medium px-2 py-1 rounded-full 
                              ${post.tag === 'Q&A' && 'bg-blue-100/80 text-blue-800'}
                              ${post.tag === 'Advice' && 'bg-purple-100/80 text-purple-800'}
                              ${post.tag === 'Tutorial' && 'bg-emerald-100/80 text-emerald-800'}
                              ${post.tag === 'Discussion' && 'bg-orange-100/80 text-orange-800'}
                              ${post.tag === 'Review' && 'bg-yellow-100/80 text-yellow-800'}
                              ${post.tag === 'Experience' && 'bg-pink-100/80 text-pink-800'}
                              ${post.tag === 'Complain' && 'bg-red-100/80 text-red-800'}
                            `}
                                                >
                                                    {post.tag}
                                                </span>
                                                <div className="text-xs text-gray-400 flex items-center">
                                                    <FiEdit3 className="mr-1" />
                                                    {post.upvote?.length || 0} votes
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Posted by {post.isAnonymous ? 'Anonymous' : post.createdBy?.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Posts */}
                        <div className="lg:w-2/3">
                            <div className="grid gap-6 md:grid-cols-2">
                                {mainPosts.map((post) => (
                                    <div
                                        key={post._id}
                                        className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/20 hover:border-blue-100"
                                    >
                                        <div className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center">
                                            <FiMessageSquare className="mr-1" />
                                            {post.comments?.length || 0}
                                        </div>
                                        <div onClick={() => navigate(`/post/${post._id}`)}>
                                            <h3 className="text-xl font-semibold text-amber-400 mb-3 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 truncate w-64">
                                                {post.content}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`text-sm font-medium px-3 py-1 rounded-full 
                              ${post.tag === 'Q&A' && 'bg-blue-100/80 text-blue-800'}
                              ${post.tag === 'Advice' && 'bg-purple-100/80 text-purple-800'}
                              ${post.tag === 'Tutorial' && 'bg-emerald-100/80 text-emerald-800'}
                              ${post.tag === 'Discussion' && 'bg-orange-100/80 text-orange-800'}
                              ${post.tag === 'Review' && 'bg-yellow-100/80 text-yellow-800'}
                              ${post.tag === 'Experience' && 'bg-pink-100/80 text-pink-800'}
                              ${post.tag === 'Complain' && 'bg-red-100/80 text-red-800'}
                            `}
                                            >
                                                <FiHash className="inline-block mr-1.5 -mt-0.5" />
                                                {post.tag}
                                            </span>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-1">
                                                    <button onClick={() => handleVote(post._id, 'upvote')}>
                                                        <FiArrowUp className="text-green-600" />
                                                    </button>
                                                    <span className="text-sm text-gray-400">
                                                        {post.upvote?.length || 0}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <button onClick={() => handleVote(post._id, 'downvote')}>
                                                        <FiArrowDown className="text-red-600" />
                                                    </button>
                                                    <span className="text-sm text-gray-400">
                                                        {post.dowvote?.length || 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Posted by {post.isAnonymous ? 'Anonymous' : post.createdBy?.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl z-50 hover:shadow-3xl transition-all duration-300 hover:scale-105"
                >
                    {showForm ? (
                        <FiX className="w-6 h-6 transform transition-transform" />
                    ) : (
                        <FiPlus className="w-6 h-6 transform transition-transform" />
                    )}
                </button>

                {/* Slide-in Form Panel */}
                <div
                    className={`fixed top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out z-40
          ${showForm ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="p-8 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="What's your post about?"
                                    value={titleInput}
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content
                                </label>
                                <textarea
                                    placeholder="Share your thoughts..."
                                    value={descriptionInput}
                                    onChange={(e) => setDescriptionInput(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 h-32"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Category
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Q&A', 'Advice', 'Tutorial', 'Discussion', 'Review', 'Experience', 'Complain'].map((tag) => (
                                        <button
                                            type="button"
                                            key={tag}
                                            onClick={() => handleTagSelect(tag)}
                                            className={`flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-all
                        ${selectedTag === tag
                                                    ? 'bg-blue-500 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            <FiHash className="mr-2" />
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8 flex items-center">
                                <input
                                    type="checkbox"
                                    id="anonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="anonymous" className="text-sm text-gray-700">
                                    Post anonymously
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="mt-auto w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
                            >
                                Publish Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommunityPage;