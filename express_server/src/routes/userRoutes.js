const express = require("express");

const {
    getCurrentUser,
    getUserById,
    checkUsernameAvailability,
    checkEmailAvailability,
    getUserProfile
} = require("../controllers/userController");

const authenticate = require("../middleware/authMiddleware");
const authorizeUser = require("../middleware/authorize");

const router = express.Router();

router.get("/me", authenticate, authorizeUser, getCurrentUser);

router.get("/userId/:id", authenticate, getUserById);

router.get(
    "/checkUsernameAvailability",
    checkUsernameAvailability
);

router.get(
    "/checkEmailAvailability",
    checkEmailAvailability
);

router.get("/:username", getUserProfile);

module.exports = router;