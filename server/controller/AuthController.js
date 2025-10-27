import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least Two characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Signup
export const signup = async (req, res) => {
  try {
    // ✅ validate input with zod
    
    const parseResult = signupSchema.safeParse(req.body);  //safeParse is a zod function, checks values against schema and returns result
    // const req.body = {
    //   name: "R",           // too short, min 2 characters
    //   email: "invalid",    // invalid email
    //   password: "123"      // too short, min 6 characters
    // };

    if (!parseResult.success) {
      console.log(parseResult);

      // Convert Zod errors to an object keyed by field
      const fieldErrors = {};
      parseResult.error.issues.forEach(err => {   //parseResult.error.issues is predefined to get result by Zod when you use safeParse.
        const fieldName = err.path[0] || "global";
        fieldErrors[fieldName] = err.message;
      });
      console.log(fieldErrors);
      
      return res.status(400).json({ success: false, errors: fieldErrors });
    }


    const { name, email, password } = parseResult.data;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, message: "User created successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    // ✅ validate input with zod
    const parseResult = loginSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      const fieldErrors = {};
      parseResult.error.issues.forEach(err => {
        const fieldName = err.path[0] || "global";
        fieldErrors[fieldName] = err.message;
      });

      return res.status(400).json({ success: false, errors: fieldErrors });
    }

    const { email, password } = parseResult.data;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// Check authentication
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    //.select("-password") means:
    // "Fetch the user document, but don’t include the password field in the result."
    // cause of security reasons, as u r sending user to the frontend
    if (!user) return res.status(401).json({ message: "User not found" });

    res.status(200).json({ message: "Authenticated", user });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Not authenticated" });
  }
};

// Get current user helper
export const getCurrentUser = async (req) => {
  try {
    const token = req.cookies.token;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    return user || null;
  } catch (err) {
    console.log("Auth check failed:", err.message);
    return null;
  }
};
