const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3002;
require("./dbConnection.js");
const { userRouter } = require("./router/userRouter");
const { postRouter } = require("./router/postRouter.js");

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(PORT, () => {
  console.log("App is running on ", PORT);
});
