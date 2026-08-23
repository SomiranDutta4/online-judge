const express = require("express");

const {
    getAllSubmissions,
    createSubmission,
    getSubmissionById,
    getSubmissionsByUserId,
    getSubmissionsByUserIdAndVerdict
} = require("../controllers/submissionController");

const router = express.Router();

router.get("/", getAllSubmissions);
router.post("/", createSubmission);
router.get("/user/:id/:verdict", getSubmissionsByUserIdAndVerdict);
router.get("/user/:id", getSubmissionsByUserId);
router.get("/:id", getSubmissionById);

module.exports = router;