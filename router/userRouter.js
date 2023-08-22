const express = require("express");
const {
  newUser,
  isEmailExist,
  loginUser,
  logoutUser,
} = require("../Controller/userControler");
const userRouter = express.Router();

userRouter.post("/newUser", newUser);
userRouter.post("/isEmailExist", isEmailExist);
userRouter.post("/loginUser", loginUser);
userRouter.post("/logoutUser", logoutUser);

module.exports = { userRouter };
