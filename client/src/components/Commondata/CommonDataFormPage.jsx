import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useUser } from '../UserContext.jsx';
import { AuthContext } from '../AuthContext.jsx'

const CommonDataFormPage = () => {
    const { user, loading } = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');

    const allowedSubjects = [
        "Computer Architecture and Organization",
        "Computer Networks",
        "Operating System",
        "Database Management System",
        "Data Structure and Algorithm",
        "Object Oriented Programming",
        "Software Engineering",
        "Theory of Computation",
        "Discrete Mathematics",
        "Cloud Computing",
        "Compiler Design",
        "Design and Analysis of Algorithm"
    ];

    useEffect(() => {
        if (!loading && user) {
            // Initialize form data based on user role
            setFormData(user.isTeacher
                ? { department: '', subjects: [] }
                : { graduationYear: '', branch: '', enrollmentNumber: '' }
            );
        }
    }, [loading, user]);

    const handleChange = (e) => {
        const { name, value, type, options } = e.target;

        if (type === 'select-multiple') {
            const selectedValues = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
            setFormData(prev => ({ ...prev, [name]: selectedValues }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = "http://localhost:5000/api/commonData";
                
            // Ensure enrollment no is unique -> To be completed
            const response = await axios.post(endpoint, {
                userId: user._id,
                ...formData
            });

            if (response.status === 201) {
                // user.isFirstTime = false; updated this in backend
                navigate('/feature');
            }
        } catch (err) {
            console.error("Submission error:", err);
            setError(err.response?.data?.message || 'Submission failed. Please try again.');
        }
    };

    if (loading || !user) {
        return <div className="p-4 text-amber-600">Loading user data...</div>;
    }

    return (
        <div className="p-4 bg-amber-50 min-h-screen">
            <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-left text-amber-600 mb-6">
                    {user.isTeacher ? 'Teacher Profile' : 'Student Profile'}
                </h2>

                <form onSubmit={handleSubmit}>
                    {user.isTeacher ? (
                        <>
                            <div className="mb-4">
                                <label className="block text-amber-700 font-semibold mb-2">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department || ''}
                                    onChange={handleChange}
                                    className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-amber-700 font-semibold mb-2">
                                    Subjects
                                </label>
                                <select
                                    name="subjects"
                                    multiple
                                    value={formData.subjects || []}
                                    onChange={handleChange}
                                    className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    required
                                >
                                    {allowedSubjects.map(subject => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-sm text-amber-600 mt-1">
                                    Hold Ctrl/Cmd to select multiple subjects
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-amber-700 font-semibold mb-2">
                                    Graduation Year
                                </label>
                                <input
                                    type="number"
                                    name="graduationYear"
                                    value={formData.graduationYear || ''}
                                    onChange={handleChange}
                                    className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    min="2000"
                                    max="2030"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-amber-700 font-semibold mb-2">
                                    Branch
                                </label>
                                <input
                                    type="text"
                                    name="branch"
                                    value={formData.branch || ''}
                                    onChange={handleChange}
                                    className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-amber-700 font-semibold mb-2">
                                    Enrollment Number
                                </label>
                                <input
                                    type="text"
                                    name="enrollmentNumber"
                                    value={formData.enrollmentNumber || ''}
                                    onChange={handleChange}
                                    className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-amber-600 text-white font-semibold py-2 rounded hover:bg-amber-700 transition-colors"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommonDataFormPage;