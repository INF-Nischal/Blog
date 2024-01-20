const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
