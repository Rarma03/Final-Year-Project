import React, { useState } from 'react';

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

const UploadBookForm = () => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
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
            driveLink: formData.driveLink.trim()
        };

        console.log('Submitting form data:', dataToSubmit);

        // TODO: Replace the console.log with an API call (e.g., using fetch or axios)

        // Optionally, reset form state after submission
        setFormData({
            title: '',
            semester: '',
            branch: '',
            subject: '',
            tags: '',
            driveLink: ''
        });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title<span className="text-red-500"> *</span>:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
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