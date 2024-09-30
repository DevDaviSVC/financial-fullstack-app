import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({error: "Not authorized: No tokens provided."});

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) return res.status(401).json({error: "Not authorized: Invalid Token."});

        const user = await User.findById(decodedToken.userId).select("-password");

        if (!user) return res.status(404).json({error: "User not found."});

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protect route:", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export default protectRoute;