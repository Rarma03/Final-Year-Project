import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx"
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const [error, setError] = useState('');
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
      // console.log(res);
      if (res.data.isFirstTime) {
        window.location.replace("/commondataform");
      }
      else {
        window.location.replace("/feature");
      }
    }
    catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Something went wrong", });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border-t-6 border-amber-500">
        <h2 className="text-2xl font-bold text-center text-amber-600 mb-6">
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
              placeholder="Your email"
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
              placeholder="Your password"
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
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-semibold py-2 rounded hover:bg-amber-700 transition-colors"
          >
            Login
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
  );
};

export default LoginPage;