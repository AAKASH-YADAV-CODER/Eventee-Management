import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"; // Make sure this path is correct
import jwt from "jsonwebtoken";

const UserAuthentication = {
  userRegister: asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Remove sensitive information from response
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -confirmPassword"
    );

    // Set cookies
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User registered successfully",
        data: {
          user: createdUser,
          accessToken,
          refreshToken,
        },
      });
  }),

  userLogin: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate new tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Update refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Remove sensitive information from response
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // Set cookies
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User logged in successfully",
        data: {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
      });
  }),

  userLogout: asyncHandler(async (req, res) => {
    // Get user from request (assuming you have authentication middleware)
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    // Find and update user to remove refresh token
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    // Clear cookies if you're using them
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User logged out successfully",
      });
  }),

  checkAuth: asyncHandler(async (req, res) => {
    try {
      const token = req.cookies?.accessToken;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token found",
        });
      }

      // Verify token
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // Find user
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          user,
        },
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }
  }),
};

export { UserAuthentication };
