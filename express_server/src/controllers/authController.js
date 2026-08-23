const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            username,
            email,
            contact,
            country,
            password,
            description,
            stats
        } = req.body;


        // Check username
        const usernameExists = await User.exists({ username });

        if (usernameExists) {
            return res.status(400).json({
                success: false,
                message: "Username is already taken!"
            });
        }


        // Check email
        const emailExists = await User.exists({ email });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email Address already in use!"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            contact,
            country,
            password: hashedPassword,
            description,
            stats
        });


        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const signin = async (req, res) => {
    try {
        const {
            usernameOrEmail,
            password
        } = req.body;


        // Find user using username OR email
        const user = await User.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });


        if (!user) {
            return res.status(400).json({
                message: "Invalid Username/Email or Password!"
            });
        }


        // Compare password with stored BCrypt hash
        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatches) {
            return res.status(400).json({
                message: "Invalid Username/Email or Password!"
            });
        }


        // Create JWT
        const token = jwt.sign(
            {},
            process.env.JWT_SECRET,
            {
                subject: user._id.toString(),
                expiresIn: Number(process.env.JWT_EXPIRATION) / 1000,
                algorithm: "HS512"
            }
        );


        return res.status(200).json({
            accessToken: token,
            tokenType: "Bearer"
        });

    } catch (error) {
        console.error("Signin error:", error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};


module.exports = {
    signup,
    signin
};