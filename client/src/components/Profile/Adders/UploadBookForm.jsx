import React, { useState } from 'react';
import axios from "axios";

// The allowed subjects for the dropdown selection
const subjects = [
    "Computer Architecture and Organization",
    "Computer Networks",
    "Operating System",
    "Database Managment System",
    "Data Structure and Alogrithm",
    "Object Oriented Programming",
    "Software Engineering",
    "Theory of Computation",
    "Discrete Mathematics",
    "Cloud Computing",
    "Compiler Design",
    "Design and Analysis of Algorithm"
];

const UploadBookForm = ({ userid }) => {
    console.log(userid);

    const [formData, setFormData] = useState({
        title: '',
        semester: '',
        branch: '',
        subject: '',
        tags: '',
        driveLink: ''
    });

    const [errors, setErrors] = useState({});

    // Handle input changes for controlled inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate required fields and the driveLink regex pattern
    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.branch.trim()) {
            newErrors.branch = 'Branch is required';
        }
        if (!formData.subject) {
            newErrors.subject = 'Subject is required';
        }
        if (!formData.driveLink.trim()) {
            newErrors.driveLink = 'Google Drive link is required';
        } else {
            // Check if the provided driveLink matches the expected Google Drive link pattern
            const regex = /https?:\/\/(drive\.google\.com|docs\.google\.com)\/.+/;
            if (!regex.test(formData.driveLink)) {
                newErrors.driveLink = 'Invalid Google Drive link';
            }
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form data
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Process tags: split comma-separated values and remove extra whitespace
        const tagsArray = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);

        // Prepare the data payload. Note that semester is converted to a number.
        const dataToSubmit = {
            title: formData.title.trim(),
            semester: formData.semester ? Number(formData.semester) : undefined,
            branch: formData.branch.trim(),
            subject: formData.subject,
            tags: tagsArray,
            driveLink: formData.driveLink.trim(),
            uploadedBy: userid
        };

        console.log('Submitting form data:', dataToSubmit);

        try {
            // Make the API call using Axios
            // const response = await axios.post("/api/books", dataToSubmit);
            const response = await axios.post("http://localhost:5000/api/book", dataToSubmit);
            console.log("Book created successfully:", response.data);
            // Optionally, notify the user or redirect after success
        } catch (error) {
            // Log error details (using optional chaining in case of no response)
            console.error("Error creating book:", error.response?.data || error.message);
            // Optionally, update error state for UI feedback
        }

        // Reset the form data and errors after submission
        setFormData({
            title: "",
            semester: "",
            branch: "",
            subject: "",
            tags: "",
            driveLink: ""
        });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Create a New Book/Notes</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title<span className="text-red-500"> *</span>:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    placeholder='e.g. DBMS Short Notes'
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                    Semester:
                </label>
                <input
                    type="number"
                    id="semester"
                    name="semester"
                    placeholder='e.g. 6'
                    value={formData.semester}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                    Branch<span className="text-red-500"> *</span>:
                </label>
                <input
                    type="text"
                    id="branch"
                    name="branch"
                    placeholder='e.g. IT'
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject<span className="text-red-500"> *</span>:
                </label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                    <option value="">Select Subject</option>
                    {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (comma separated):
                </label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    placeholder='e.g. dbms notes, quick notes, new notes'
                    value={formData.tags}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700">
                    Google Drive Link<span className="text-red-500"> *</span>:
                </label>
                <input
                    type="url"
                    id="driveLink"
                    name="driveLink"
                    placeholder='e.g. google drive link'
                    value={formData.driveLink}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.driveLink && <p className="text-red-500 text-xs mt-1">{errors.driveLink}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Upload Book/Notes
            </button>
        </form>
    );
};

export default UploadBookForm;