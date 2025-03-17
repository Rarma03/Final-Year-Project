import express from 'express';
import fs from 'fs';
import multer from 'multer';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import EventModel from '../models/EventModel.js';

dotenv.config();
const router = express.Router();

// Multer setup for temporary storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// S3 client setup
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Helper function to upload file to S3
const uploadToS3 = async (filePath, originalFilename, mimetype) => {
    const bucket = process.env.AWS_BUCKET_NAME;
    const fileData = fs.readFileSync(filePath);
    const newFilename = `${Date.now()}-${originalFilename}`;
    await s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: newFilename,
        Body: fileData,
        ContentType: mimetype,
        ACL: 'public-read',
    }));
    fs.unlinkSync(filePath);
    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFilename}`;
};

// Route to handle file upload
router.post('/upload', upload.single('poster'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const posterUrl = await uploadToS3(req.file.path, req.file.originalname, req.file.mimetype);
        res.json({ posterUrl });
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        res.status(500).json({ error: 'Error uploading file to S3' });
    }
});

// Route to create a new event
router.post('/createform', async (req, res) => {
    try {
        const { userid, posterLink, registerLink, instagramLink } = req.body;
        const newEvent = await EventModel.create({
            userid,
            posterLink,
            registerLink,
            instagramLink,
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// *** New GET route for fetching events with pagination ***
router.get('/allevents', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const events = await EventModel.find()
            .sort({ createdAt: -1, _id: -1 }) // Secondary sort on _id ensures unique order
            .skip(skip)
            .limit(limit);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update view count for an event
router.patch('/events/:id/view', async (req, res) => {
    try {
        const { id } = req.params;
        // Atomically increment the view count by 1
        const updatedEvent = await EventModel.findByIdAndUpdate(
            id,
            { $inc: { view: 1 } },
            { new: true } // Return the updated document
        );
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating view count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to delete old events and their associated S3 objects
const deleteOldEventsAndS3Objects = async () => {
    const daysThreshold = 30;
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - daysThreshold);

    // Delete old events from the database
    const oldEvents = await EventModel.find({ createdAt: { $lt: dateThreshold } });
    const posterLinks = oldEvents.map(event => event.posterLink);
    await EventModel.deleteMany({ _id: { $in: oldEvents.map(event => event._id) } });

    // Delete associated objects from S3
    const bucket = process.env.AWS_BUCKET_NAME;
    const objectsToDelete = posterLinks.map(link => {
        const key = link.split('/').pop();
        return { Key: key };
    });

    if (objectsToDelete.length > 0) {
        await s3Client.send(new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: { Objects: objectsToDelete },
        }));
    }
};

// Schedule the deletion function to run daily
setInterval(deleteOldEventsAndS3Objects, 24 * 60 * 60 * 1000);

export default router;