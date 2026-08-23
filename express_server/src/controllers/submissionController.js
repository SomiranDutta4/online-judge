const Submission = require("../models/Submission");

const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find();
        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch submissions"
        });
    }
};

const createSubmission = async (req, res) => {
    try {
        await Submission.create(req.body);
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create submission"
        });
    }
};

const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({
                message: `Submission not found with id: ${req.params.id}`
            });
        }

        res.status(200).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch submission"
        });
    }
};

const getSubmissionsByUserId = async (req, res) => {
    try {
        const submissions = await Submission.find({
            userId: req.params.id
        });

        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch submissions"
        });
    }
};

const getSubmissionsByUserIdAndVerdict = async (req, res) => {
    try {
        const submissions = await Submission.find({
            userId: req.params.id,
            verdict: req.params.verdict
        });

        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch submissions"
        });
    }
};

module.exports = {
    getAllSubmissions,
    createSubmission,
    getSubmissionById,
    getSubmissionsByUserId,
    getSubmissionsByUserIdAndVerdict
};