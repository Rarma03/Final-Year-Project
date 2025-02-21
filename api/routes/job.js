import express from 'express';
import JobpostModel from '../models/JobpostModel.js'; // Adjust the path as needed
import DataModel from '../models/DataModel.js';

const router = express.Router();

router.post('/createjobpost', async (req, res) => {
    try {
        // Create the new job post
        const jobpost = new JobpostModel(req.body);
        await jobpost.save();

        // Extract the user ID from the request body
        const { postedBy } = req.body;

        // Push the new job post's ID into the DataModel for the given user
        await DataModel.findOneAndUpdate(
            { userId: postedBy },
            { $push: { jobPosts: jobpost._id } },
            { new: true } // returns the updated document, if needed
        );

        res.status(201).json({ message: 'Job post created successfully', jobpost });
    } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ error: 'Failed to create job post' });
    }
});

// GET route to fetch all job posts
router.get('/alljobpost', async (req, res) => {
    try {
        const jobs = await JobpostModel.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching job posts:', error);
        res.status(500).json({ error: 'Failed to fetch job posts' });
    }
});

// DELETE route to delete a job post by its ID
router.delete('/jobpost/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the job post by its ID
        const job = await JobpostModel.findById(id);
        if (!job) {
            return res.status(404).json({ error: 'Job post not found' });
        }

        // Remove the job post reference from the user's DataModel document
        await DataModel.findOneAndUpdate(
            { userId: job.postedBy },
            { $pull: { jobPosts: job._id } }
        );

        // Delete the job post document
        await job.deleteOne();

        res.status(200).json({ message: 'Job post deleted successfully' });
    } catch (error) {
        console.error('Error deleting job post:', error);
        res.status(500).json({ error: 'Failed to delete job post' });
    }
});

export default router;