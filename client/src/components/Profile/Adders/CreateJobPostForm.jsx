import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateJobPostForm = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        postedBy: user._id,
        companyName: '',
        jobDescription: '',
        role: '',
        salary: '',
        city: '',
        jobLink: '',
        jobType: 'Full-Time',
        linkedinUrl: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            const endpoint = `${BASE_URL}/api/job/createjobpost`;
            const response = await axios.post(endpoint, formData);
            if (response.status === 201) {
                // Navigate to a page showing your job posts, for example:
                navigate('/jobs/myjobpost');
            }
        } catch (err) {
            console.error("Submission error:", err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md border-t-4 border-b-4 border-amber-500">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Create Job Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        placeholder="e.g. Google"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description:</label>
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        placeholder="e.g. Looking for a Software Engineer with 3+ years of experience..."
                        value={formData.jobDescription}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200 h-[150px]"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        placeholder="e.g. Frontend Developer"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary:</label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        placeholder="e.g. Competitive Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="e.g. As Per Business Req."
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="jobLink" className="block text-sm font-medium text-gray-700">Job Link:</label>
                    <input
                        type="text"
                        id="jobLink"
                        name="jobLink"
                        placeholder="e.g. https://company.com/jobs/123"
                        value={formData.jobLink}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type:</label>
                    <select
                        id="jobType"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Intern">Intern</option>
                        <option value="Part-Time">Part-Time</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">Your LinkedIn Profile URL:</label>
                    <input
                        type="text"
                        id="linkedinUrl"
                        name="linkedinUrl"
                        placeholder="e.g. https://linkedin.com/company/..."
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-700 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
export default CreateJobPostForm;