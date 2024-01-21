const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

// 3 days in seconds for jwt token
const maxAge = 3 * 24 * 60 * 60;

// To create jwt Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const registerUser = async (req, res) => {
  try {
    const { email, password, cpassword, ...userData } = req.body;

    // checking if email already exists in db
    const existingUser = await User.findOne({ email });

    // checking if user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // checking if password and confirm password are same
    if (password !== cpassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password does not match" });
    }

    // hashing password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Error handling for creating user
    try {
      const user = await User.create({
        email,
        password: hashedPassword,
        cpassword: hashedPassword,
        ...userData,
      });

      const token = createToken(user._id);

      // checking if token is created
      if (!token) {
        return res.status(500).json({ message: "Token not created" });
      }

      // setting cookie in browser
      await res.cookie("jwt_token", token, {
        httpOnly: true,
        path: "/",
        maxAge: maxAge * 1000,
      });

      res
        .status(201)
        .json({ message: "User created successfully", user, token });
    } catch (error) {
      console.log("Error in creating user: ", error);
      res
        .status(500)
        .json({ message: "Internal server error. Please try again later." });
    }
  } catch (error) {
    console.log("Error in user registration: ", error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exisitingUser = await User.findOne({ email });

    // checking if user exists
    if (!exisitingUser) {
      return res.status(400).json({ message: "User does not exists" });
    }

    // checking if password is correct
    const isPassword = await bcrypt.compare(password, exisitingUser.password);

    if (!isPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Error handling for creating user token
    try {
      // Creating token using user id
      const token = createToken(exisitingUser._id);

      // checking if token is created
      if (!token) {
        return res.status(500).json({ message: "Token not created" });
      }

      // setting cookie in browser
      await res.cookie("jwt_token", token, {
        httpOnly: true,
        path: "/",
        maxAge: maxAge * 1000,
      });

      res.status(201).json({ message: "User Logged in successfully" });
    } catch (error) {
      console.log("Error in creating user: ", error);
      res
        .status(500)
        .json({ message: "Internal server error. Please try again later." });
    }
  } catch (error) {
    console.log("Error in user login: ", error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.jwt_token;

    if (!token) {
      return res.status(400).json({ message: "User not logged in" });
    }

    res.cookie("jwt_token", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logging out user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
