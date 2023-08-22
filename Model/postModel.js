const { Schema, model } = require("mongoose");
const postSchema = new Schema({
  postById: String,
  postByName: String,
  postContent: String,
  likeList: Array,
  commentList: Array,
});
const postModel = model("postCollection", postSchema);
module.exports = postModel;
