import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; 
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import commonData from "./routes/commonData.js";
import flatRoute from "./routes/flat.js";


const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/commonData", commonData);
app.use("/api/flat", flatRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
