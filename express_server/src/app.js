const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/submission", submissionRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Online Judge API is running"
    });
});

module.exports = app;