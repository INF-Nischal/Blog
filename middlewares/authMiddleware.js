const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");
dotenv.config();

// middleware to verify token
const verifyToken = async (req, res, next) => {
  // gettin token from cookie
  const token = req.cookies.jwt_token;

  //checking if token exists
  if (!token) {
    return res.status(401).json({ authorized: false, user: null });
  }

  try {
    // verifying token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // using decoded token to find user
    const user = await User.findById(decodedToken.id);

    // checking if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // calling next middleware
    next();

    // Here we are sending res.json due to error of multiple headers sent
    // so we are going to check if(authorized === false) and else will be true
    // so this way we can know if user is authorized or not
  } catch (error) {
    console.log(error);
    return res.status(500).json({ authorized: false, user: null });
  }
};

module.exports = verifyToken;
