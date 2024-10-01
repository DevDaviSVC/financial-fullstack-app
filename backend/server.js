import express from "express";
import dotenv from "dotenv";
import { connectToMongoDb } from "./db/connectToMongoDb.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}!`);
    connectToMongoDb();
});