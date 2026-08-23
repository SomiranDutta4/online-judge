const Problem = require("../models/Problem");

const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch problems" });
    }
};

const createProblem = async (req, res) => {
    try {
        await Problem.create(req.body);
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create problem" });
    }
};

const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({
                message: `Problem not found with id: ${req.params.id}`
            });
        }

        res.status(200).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch problem" });
    }
};

const getProblemByName = async (req, res) => {
    try {
        const problem = await Problem.findOne({
            name: req.params.name
        });

        if (!problem) {
            return res.status(404).json({
                message: `Problem not found with name: ${req.params.name}`
            });
        }

        res.status(200).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch problem" });
    }
};

module.exports = {
    getAllProblems,
    createProblem,
    getProblemById,
    getProblemByName
};