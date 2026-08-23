const express = require("express");

const {
    getAllProblems,
    createProblem,
    getProblemById,
    getProblemByName
} = require("../controllers/problemController");

const router = express.Router();

router.get("/", getAllProblems);
router.post("/", createProblem);
router.get("/name/:name", getProblemByName);
router.get("/:id", getProblemById);

module.exports = router;