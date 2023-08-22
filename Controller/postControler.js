const postModel = require("../Model/postModel");
const newPost = (req, res) => {
  const { postById, postByName, postContent, likeList, commentList } = req.body;
  postModel
    .create({ postById, postByName, postContent, likeList, commentList })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
};
const postList = (req, res) => {
  postModel
    .find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
};
const getPost = (req, res) => {
  const { postId } = req.params;
  postModel
    .findById(postId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
};
const toggleLike = (req, res) => {
  const { postId, userId } = req.body;
  postModel
    .findById(postId)
    .then((data) => {
      const likeList = data.likeList;
      const idx = likeList.findIndex((i) => i === userId);
      if (idx === -1) {
        likeList.push(userId);
        postModel
          .findByIdAndUpdate(postId, { likeList: likeList })
          .then((data) => {
            res.status(200).send({ isLiked: true });
          });
      } else {
        likeList.splice(idx, 1);
        postModel
          .findByIdAndUpdate(postId, { likeList: likeList })
          .then((data) => {
            res.status(200).send({ isLiked: false });
          });
      }
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
};
const newComment = (req, res) => {
  const { postId, commentByUserId, commentByUserName, userComment } = req.body;
  postModel
    .findById(postId)
    .then((data) => {
      const commentList = data.commentList;
      commentList.push({
        postId,
        commentByUserId,
        commentByUserName,
        userComment,
      });
      postModel
        .findByIdAndUpdate(postId, { commentList: commentList })
        .then((data) => {
          res.status(200).send({ data });
        });
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
};
module.exports = { newPost, postList, getPost, toggleLike, newComment };
