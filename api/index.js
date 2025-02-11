// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Importing database models
import BookModel from './models/BookModel.js'
import JobpostModel from './models/JobpostModel.js'
import StudentModel from './models/StudentModel.js'
import TeacherModel from './models/TeacherModel.js'

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow frontend requests
app.use(cookieParser());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Test route
app.get('/', (req, res) => {
    res.json('test okay');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});