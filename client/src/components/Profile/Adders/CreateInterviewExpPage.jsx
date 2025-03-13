import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";  // Updated import as per latest Quill docs

const jobTypes = ["Full-Time", "Intern", "Intern + FT"];
const difficulties = ["Easy", "Medium", "Hard", "Difficult"];

const CreateInterviewExpPage = ({ userid, username }) => {
    const [formData, setFormData] = useState({
        companyName: "",
        role: "",
        interviewRounds: "",
        interviewRoundsDescription: "",
        interviewDate: "", // expects a YYYY-MM-DD string
        salary: "",
        interviewDifficulty: "",
        city: "",
        jobType: "",
        linkedinUrl: "",
        postedBy: userid,
        uploaderName: username,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleQuillChange = (value) => {
        setFormData((prev) => ({ ...prev, interviewRoundsDescription: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.companyName.trim())
            newErrors.companyName = "Company name is required";
        if (!formData.role.trim())
            newErrors.role = "Role is required";
        if (!formData.salary.trim())
            newErrors.salary = "Salary is required";
        // Add additional validations if needed.
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const dataToSubmit = {
            ...formData,
            postedBy: userid,
            uploaderName: username,
        };

        try {
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            await axios.post(`${BASE_URL}/api/interview/create`, dataToSubmit);
            alert("Submitted successfully! ❤️ThankYou for Contributing");
            setFormData({
                companyName: "",
                role: "",
                interviewRounds: "",
                interviewRoundsDescription: "",
                interviewDate: "",
                salary: "",
                interviewDifficulty: "",
                city: "",
                jobType: "",
                linkedinUrl: "",
                postedBy: userid,
                uploaderName: username,
            });
            setErrors({});
        } catch (error) {
            console.error("Error submitting experience:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md border-t-4 border-b-4 border-amber-500">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Share Interview Experience</h2>

            {/* Company Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Company Name<span className="text-red-500"> *</span>:
                </label>
                <input
                    type="text"
                    name="companyName"
                    placeholder="e.g. Google"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
            </div>

            {/* Role */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Role<span className="text-red-500"> *</span>:
                </label>
                <input
                    type="text"
                    name="role"
                    placeholder="e.g. SWE - I"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>

            {/* Interview Rounds */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Interview Rounds:</label>
                <input
                    type="number"
                    name="interviewRounds"
                    placeholder="e.g. 2"
                    value={formData.interviewRounds}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* Interview Rounds Description using ReactQuill */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Interview Rounds Description:</label>
                <ReactQuill
                    value={formData.interviewRoundsDescription}
                    onChange={handleQuillChange}
                    className="bg-white"
                    placeholder="e.g. Round - 01 -> desc.. (next line) Round - 02 -> desc.."
                />
            </div>

            {/* Interview Date */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">When You Gone Through Interview:</label>
                <input
                    type="date"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* Salary */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Salary<span className="text-red-500"> *</span>:
                </label>
                <input
                    type="text"
                    name="salary"
                    placeholder="e.g. 15 lpa or NA"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
                {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
            </div>

            {/* Interview Difficulty */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Interview Difficulty:</label>
                <select
                    name="interviewDifficulty"
                    value={formData.interviewDifficulty}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select Difficulty</option>
                    {difficulties.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            {/* City */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Work Location <span className="text-red-500"> *</span>:</label>
                <input
                    type="text"
                    name="city"
                    placeholder="e.g. Goa or NA"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* Job Type */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Job Type<span className="text-red-500"> *</span>:</label>
                <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select Job Type</option>
                    {jobTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* LinkedIn URL */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">LinkedIn URL:</label>
                <input
                    type="text"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    className="w-full p-2 border rounded-md"
                />
            </div>

            <button type="submit" className="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">
                Submit Experience
            </button>
        </form>
    );
};

export default CreateInterviewExpPage;