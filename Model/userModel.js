const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isLogin: Boolean,
});
const userModel = model("userCollection", userSchema);
module.exports = userModel;
