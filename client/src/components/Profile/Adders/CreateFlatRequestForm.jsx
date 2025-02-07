import React, { useState } from 'react';

const CreateFlatRequestForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        genderPreference: 'any',
        rent: '',
        moveInDate: '',
        smokingAllowed: false,
        contactInfo: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Find a Roommate</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200" />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200" />
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Google Maps Link:</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200" />
                </div>

                <div className="mb-4">
                    <label htmlFor="genderPreference" className="block text-sm font-medium text-gray-700">Gender Preference:</label>
                    <select id="genderPreference" name="genderPreference" value={formData.genderPreference} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200">
                        <option value="any">Any</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="rent" className="block text-sm font-medium text-gray-700">Rent (in $):</label>
                    <input type="number" id="rent" name="rent" value={formData.rent} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200" />
                </div>

                <div className="mb-4">
                    <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700">Move-in Date:</label>
                    <input type="date" id="moveInDate" name="moveInDate" value={formData.moveInDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200" />
                </div>

                <div className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="smokingAllowed" checked={formData.smokingAllowed} onChange={handleChange} />
                        <span>Smoking Allowed</span>
                    </label>
                </div>

                <div className="mb-4">
                    <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Info:</label>
                    <input type="text" id="contactInfo" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-amber-500 focus:ring focus:ring-amber-200" />
                </div>

                <button type="submit" className="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-700 transition duration-200">Submit</button>
            </form>
        </div>
    );
};

export default CreateFlatRequestForm;