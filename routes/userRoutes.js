const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");
const verifyToken = require("../middlewares/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", verifyToken, logoutUser);

module.exports = userRouter;
