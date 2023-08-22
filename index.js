const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const PORT = 3001;
require("./dbConnection.js");
const { userRouter } = require("./router/userRouter");
const { postRouter } = require("./router/postRouter.js");

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(PORT, () => {
  console.log("App is running on ", PORT);
});
