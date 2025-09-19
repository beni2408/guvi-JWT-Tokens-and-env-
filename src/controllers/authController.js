import userModel from "../models/User.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    // TODO: encrypt password before saving to the DB
    const { username, email, password, gender, role } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({
        status: "error",
        message: `User already exists with this ${email}`,
        data: {
          username: existingUser.username,
          email: existingUser.email,
        },
      });
    }

    // TODO: encrypt password before saving to the DB
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hasedPassword,
      gender,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    if (next) return next(error);
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found with this email",
        data: user,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "Invalid details",
      });
    }
    // JWT Token generation logic
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_AUTH_SECRET_KEY
    );

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
