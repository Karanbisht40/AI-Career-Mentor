import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const bearerToken = authHeader?.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;

        const cookieToken = req.cookies?.token;

        const token = bearerToken || cookieToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is required.",
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the full user from MongoDB
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        // Attach full user document to the request
        req.user = user;

        next();
    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};