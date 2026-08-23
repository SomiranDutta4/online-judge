const User = require("../models/User");

const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            id: user._id.toString(),
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch current user"
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: `User not found with id: ${req.params.id}`
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch user"
        });
    }
};

const checkUsernameAvailability = async (req, res) => {
    try {
        const exists = await User.exists({
            username: req.query.username
        });

        res.status(200).json({
            available: !exists
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to check username"
        });
    }
};

const checkEmailAvailability = async (req, res) => {
    try {
        const exists = await User.exists({
            email: req.query.email
        });

        res.status(200).json({
            available: !exists
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to check email"
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username
        });

        if (!user) {
            return res.status(404).json({
                message: `User not found with username: ${req.params.username}`
            });
        }

        res.status(200).json({
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            date: user.date
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch user profile"
        });
    }
};

module.exports = {
    getCurrentUser,
    getUserById,
    checkUsernameAvailability,
    checkEmailAvailability,
    getUserProfile
};