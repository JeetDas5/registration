import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { Request, Response } from "express";

import User from "../models/user.model";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middlewares/auth.middleware";

import { registerSchema, loginSchema } from "../validations/auth.validations";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const { name, dob, email, password } = validatedData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      dob,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

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
  } catch (error) {
    if (error instanceof ZodError) {
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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const { email, password } = validatedData;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());

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
  } catch (error) {
    if (error instanceof ZodError) {
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

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
