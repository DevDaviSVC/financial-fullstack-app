import express from "express";
import dotenv from "dotenv";
import { connectToMongoDb } from "./db/connectToMongoDb.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;

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


app.listen(PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}!`);
    connectToMongoDb();
});