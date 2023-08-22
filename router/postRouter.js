const express = require("express");
const {
  newPost,
  postList,
  getPost,
  toggleLike,
  newComment,
} = require("../Controller/postControler");
const postRouter = express.Router();

postRouter.post("/newPost", newPost);
postRouter.get("/postList", postList);
postRouter.get("/getPost/:postId", getPost);
postRouter.post("/toggleLike", toggleLike);
postRouter.post("/newComment", newComment);

module.exports = { postRouter };
