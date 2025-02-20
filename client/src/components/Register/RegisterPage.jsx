import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isTeacher: false,
        teacherCode: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // When the checkbox is toggled, reset teacherCode and error if unchecked.
        if (name === 'isTeacher') {
            setFormData(prev => ({
                ...prev,
                [name]: checked,
                teacherCode: checked ? prev.teacherCode : ''
            }));
            if (!checked) setError('');
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // If registering as teacher, validate the unique code.
        if (formData.isTeacher) {
            if (formData.teacherCode.trim() !== 'gsfaculty') {
                setError('Invalid teacher unique ID.');
                return;
            }
        }
        // Clear any previous error.
        setError('');

        try {
            // Make a POST request to your registration endpoint.
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            const response = await axios.post(`${BASE_URL}/api/auth/register`, formData);

            // Check if the registration is successful.
            if (response.status === 201) {
                window.location.replace("/login");
            }
            else {
                setError(response.data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border-t-4 border-amber-500">
                <h1 className="text-2xl font-bold text-center text-amber-600 mb-6">
                    Register
                </h1>
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-amber-700 font-semibold mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g. Raj Verma"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-amber-700 font-semibold mb-2"
                        >
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
                        <label
                            htmlFor="password"
                            className="block text-amber-700 font-semibold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter new password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    {/* Teacher Checkbox */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="isTeacher"
                            name="isTeacher"
                            checked={formData.isTeacher}
                            onChange={handleChange}
                            className="h-4 w-4 text-amber-600 focus:ring-amber-400 border-amber-300 rounded"
                        />
                        <label htmlFor="isTeacher" className="ml-2 text-amber-700">
                            Register as Teacher
                        </label>
                    </div>
                    {/* Conditionally Render Teacher Unique ID Field */}
                    {formData.isTeacher && (
                        <div className="mb-4">
                            <label
                                htmlFor="teacherCode"
                                className="block text-amber-700 font-semibold mb-2"
                            >
                                Teacher Unique ID
                            </label>
                            <input
                                type="text"
                                id="teacherCode"
                                name="teacherCode"
                                placeholder="Enter teacher unique ID"
                                value={formData.teacherCode}
                                onChange={handleChange}
                                required
                                className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                            )}
                        </div>
                    )}
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-amber-600 text-white font-semibold py-2 rounded hover:bg-amber-700 transition-colors"
                    >
                        Register
                    </button>
                </form>
                <div>Already a User ?&nbsp;
                    <Link to="/login" className='text-green-500 underline'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;