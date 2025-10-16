import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// JWT authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info to request
        next(); // continue to route
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
}

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

        // Success
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
    }
});

// Create a new plan
app.post("/api/save-plan", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, schedules } = req.body;

        if (!name || !Array.isArray(schedules)) {
            return res.status(400).json({ message: "Missing name or invalid schedules" });
        }

        // Create plan and all its schedules
        const plan = await prisma.plan.create({
            data: {
                name,
                userId,
                schedules: {
                    create: schedules.map((s) => ({
                        day: s.Day,
                        focus: s.Focus,
                        exercises: s.Exercises,
                    })),
                },
            },
            include: { schedules: true },
        });

        res.json({ message: "Plan saved successfully!", plan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving plan" });
    }
});

// Get all plans for a user
app.get("/api/plans", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const plans = await prisma.plan.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                createdAt: true,
                schedules: { select: { day: true, focus: true } },
            },
        });
        res.json({ plans });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error loading plans" });
    }
});

// Load a specific plan by ID
app.get("/api/plan/:id", authenticateToken, async (req, res) => {
    try {
        const planId = parseInt(req.params.id);
        const plan = await prisma.plan.findUnique({
            where: { id: planId },
            include: { schedules: true },
        });

        if (!plan) return res.status(404).json({ message: "Plan not found" });
        res.json(plan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching plan" });
    }
});

// Delete a specific plan
app.delete("/api/plan/:id", authenticateToken, async (req, res) => {
    try {
        const planId = parseInt(req.params.id);
        const plan = await prisma.plan.findUnique({ where: { id: planId } });

        if (!plan) return res.status(404).json({ message: "Plan not found" });

        await prisma.schedule.deleteMany({ where: { planId } });
        await prisma.plan.delete({ where: { id: planId } });

        res.json({ message: "Plan deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting plan" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
