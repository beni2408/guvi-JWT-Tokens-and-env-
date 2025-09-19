import userModel from "../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
    // TODO: encrypt password before saving to the DB
    const { email } = req.body;

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

    const newUser = new userModel(req.body);
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

export const loginUser = async (req, res) => {};
