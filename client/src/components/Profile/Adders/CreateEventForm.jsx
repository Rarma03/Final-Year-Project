import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEventForm = ({ user }) => {
    console.log(user)
    const navigate = useNavigate();

    // Initialize form data with user's ID and empty fields for poster, registration link, and Instagram link.
    const [formData, setFormData] = useState({
        userid: user._id,
        posterLink: '',
        registerLink: '',
        instagramLink: '',
    });

    const [posterFile, setPosterFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Update text field values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Store selected file
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPosterFile(e.target.files[0]);
        }
    };

    // Upload file to our backend, which in turn uploads to AWS S3
    const uploadPoster = async (file) => {
        try {
            setUploading(true);
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            // Create FormData for file upload
            const fileData = new FormData();
            fileData.append('poster', file);
            // POST the file to our /api/event/upload endpoint
            const response = await axios.post(`${BASE_URL}/api/event/upload`, fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploading(false);
            // The backend returns the posterUrl
            const { posterUrl } = response.data;
            return posterUrl;
        } catch (err) {
            setUploading(false);
            console.error("Error uploading poster: ", err);
            throw err;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!posterFile) {
                alert("Please select a poster to upload.");
                return;
            }
            // Upload poster and retrieve its URL
            const posterURL = await uploadPoster(posterFile);
            console.log("Uploaded poster URL:", posterURL);
            // Append the poster URL to form data
            const finalData = { ...formData, posterLink: posterURL };

            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            const response = await axios.post(`${BASE_URL}/api/event/createform`, finalData);
            if (response.status === 201) {
                navigate('/events');
            }
        } catch (err) {
            console.log("Submission error:", err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md border-t-4 border-b-4 border-amber-500">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Create Event Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="poster" className="block text-sm font-medium text-gray-700">
                        <span className='text-red-400'>*</span>
                        Event Poster:
                    </label>
                    <input
                        type="file"
                        id="poster"
                        name="poster"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="registerLink" className="block text-sm font-medium text-gray-700">
                        <span className='text-red-400'>*</span>
                        Registration Link:
                    </label>
                    <input
                        type="text"
                        id="registerLink"
                        name="registerLink"
                        placeholder='e.g. https://example.com/register'
                        value={formData.registerLink}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="instagramLink" className="block text-sm font-medium text-gray-700">
                        Instagram Link (optional):
                    </label>
                    <input
                        type="text"
                        id="instagramLink"
                        name="instagramLink"
                        placeholder='e.g. https://instagram.com/yourhandle'
                        value={formData.instagramLink}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                </div>
                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-700 transition duration-200"
                >
                    {uploading ? "Uploading..." : "Submit"}
                </button>
                <span className='text-red-300'>*Post Will Be Auto Delete after 30days</span>
            </form>
        </div>
    );
};

export default CreateEventForm;