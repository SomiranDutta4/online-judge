const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = authHeader.substring(7);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // In the Java implementation, JWT subject contains user ID
        const user = await User.findById(decoded.sub);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Make current user available to controllers
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authenticate;