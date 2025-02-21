import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from './JobCard';

const MyJobPostPage = ({ user }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
                const response = await axios.get(`${BASE_URL}/api/job/alljobpost`);
                setJobs(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Error fetching jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Job Posts</h2>
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} canDelete={true} user={user} />
            ))}
        </div>
    );
};

export default MyJobPostPage;
