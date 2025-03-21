import express from "express";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Auth endpoint is working!");
});

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            isTeacher: req.body.isTeacher
        });

        const user = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user });

    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "Wrong Credentials" });
        }

        const validated = await bcrypt.compare(req.body.password, user.password);

        if (!validated) {
            return res.status(400).json({ message: "Wrong Credentials" });
        }

        const jwtSecretKey = "your_secret_key";
        const token = jwt.sign({ id: user._id }, jwtSecretKey);

        const { password, ...others } = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true
        });

        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;
