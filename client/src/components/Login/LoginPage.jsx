import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      if (res.data.isFirstTime) {
        window.location.replace("/commondataform");
      } else {
        window.location.replace("/feature");
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || "Something went wrong",
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Back Button positioned at the top left corner */}
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center bg-white py-1 px-3 rounded-full border-2 border-amber-300"
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

      {/* Centered Login Form */}
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border-t-6 border-amber-500">
          <h2 className="text-2xl font-bold text-center text-amber-600 mb-6 flex flex-row items-center justify-center">
            <img src="https://github.com/Rarma03/Final-Year-Project/blob/main/client/public/cutemouse.gif?raw=true" className='h-[50px]' />
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-amber-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. 0801XX211071@sgsits.ac.in"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-amber-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="e.g. pass1234"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4">Wrong Credentials</p>
            )}
            {/* Submit Button with Loading Effect */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-amber-600 text-white font-semibold py-2 rounded transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-700'
                }`}
            >
              {loading ? '🪄Just a Min...' : 'Login 🔒'}
            </button>
          </form>
          <div className="mt-4 text-center">
            Don't have an account?&nbsp;
            <Link to="/register" className="text-green-500 underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;