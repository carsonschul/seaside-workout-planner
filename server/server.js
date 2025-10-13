import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

dotenv.config(); // reads the .env file
const app = express();
const prisma = new PrismaClient();

app.use(cors()); // allow your React app to talk to it
app.use(express.json()); // read JSON data

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// SIGNUP route
app.post("/api/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create new user
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        // 4. Send response
        res.json({ message: "User created successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user in database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Compare password with hashed one
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password." });
        }

        // Success ✅
        res.status(200).json({ message: "Login successful!", email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
