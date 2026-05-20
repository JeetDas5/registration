"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const auth_validations_1 = require("../validations/auth.validations");
const registerUser = async (req, res) => {
    try {
        const validatedData = auth_validations_1.registerSchema.parse(req.body);
        const { name, dob, email, password } = validatedData;
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await user_model_1.default.create({
            name,
            dob,
            email,
            password: hashedPassword,
        });
        const token = (0, jwt_1.generateToken)(user._id.toString());
        return res.status(201).json({
            message: "Registration successful",
            token,
            data: {
                id: user._id,
                name: user.name,
                dob: user.dob,
                email: user.email,
            },
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.issues[0].message,
            });
        }
        return res.status(500).json({
            message: "Failed to register user",
            error,
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const validatedData = auth_validations_1.loginSchema.parse(req.body);
        const { email, password } = validatedData;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        const token = (0, jwt_1.generateToken)(user._id.toString());
        return res.status(200).json({
            message: "Login successful",
            token,
            data: {
                id: user._id,
                name: user.name,
                dob: user.dob,
                email: user.email,
            },
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.issues[0].message,
            });
        }
        return res.status(500).json({
            message: "Failed to login user",
            error,
        });
    }
};
exports.loginUser = loginUser;
const getMe = async (req, res) => {
    try {
        const user = await user_model_1.default.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getMe = getMe;
