const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Otp = require("../models/Otp");

const { sendOTPEmail } = require("../utils/mailService");

// ===============================
// Generate OTP
// ===============================
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// ===============================
// Send OTP
// ===============================
const sendOTP = async (req, res) => {

    try {

        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please Login.",
            });
        }

        // Generate OTP
        const otp = generateOTP();

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Remove old OTP
        await Otp.deleteMany({ email });

        // Store temporary registration details
        await Otp.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: "Farmer",
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        // Send OTP email
        await sendOTPEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

// ===============================
// Verify OTP & Register User
// ===============================
const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const otpRecord = await Otp.findOne({
            email,
            otp,
        });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired OTP",
            });
        }

        // Double-check user
        const existingUser = await User.findOne({
            email: otpRecord.email,
        });

        if (existingUser) {

            await Otp.deleteOne({
                _id: otpRecord._id,
            });

            return res.status(400).json({
                success: false,
                message: "User already exists",
            });

        }

        // Create verified user
        const user = new User({

            name: otpRecord.name,
            email: otpRecord.email,
            password: otpRecord.password,
            phone: otpRecord.phone,
            role: otpRecord.role,
            isVerified: true,

        });

        await user.save();

        // Remove OTP
        await Otp.deleteOne({
            _id: otpRecord._id,
        });

        return res.status(201).json({
            success: true,
            message: "Registration Successful. Please Login.",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

// ===============================
// Login
// ===============================
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email,
                role: user.role,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }

        );

        return res.status(200).json({

            success: true,
            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,

            },

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

module.exports = {
    sendOTP,
    verifyOTP,
    login,
};