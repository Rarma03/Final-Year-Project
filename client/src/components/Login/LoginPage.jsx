import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Update form data on input change.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission with axios.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Adjust the endpoint URL as needed.
      const response = await axios.post('http://localhost:5000/api/login', formData);
      // Assuming the backend returns a JSON object with a "success" flag.
      if (response.status === 200 && response.data.success) {
        navigate('/feature');
      }
      else {
        setError(response.data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
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
            <p className="text-red-500 text-sm mb-4">{error}</p>
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