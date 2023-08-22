const userModel = require("../Model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const newUser = (req, res) => {
  const { name, email, password } = req.body;
  const passwordSalt = bcryptjs.genSaltSync(10);
  const hasedPassword = bcryptjs.hashSync(password, passwordSalt);
  userModel
    .create({ name, email: email.toLowerCase(), password: hasedPassword })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
};
const isEmailExist = (req, res) => {
  const { email } = req.body;
  userModel
    .findOne({ email: email.toLowerCase() })
    .then((data) => {
      if (data) res.status(200).json({ isExist: true });
      else res.status(200).json({ isExist: false });
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send({ Message: "Something went wrong" });
    });
};
const logoutUser = (req, res) => {
  const { authorization } = req.headers;
  const authData = authorization ? authorization.split(" ") : [];
  const token = authData[1];
  // console.log("Authorized: " + authorization);
  const userInfo = jwt.verify(token, "newton_School_Linkedin");
  userModel
    .findByIdAndUpdate(userInfo.id, { isLogin: false })
    .then((data) => {
      res.status(200).json({ message: "Loutout Successfully" });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ message: "some error occurred" });
    });
};
const loginUser = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email: email.toLowerCase() })
    .select()
    .then((data) => {
      const isValidUser = bcryptjs.compareSync(password, data.password);
      if (isValidUser) {
        userModel
          .findByIdAndUpdate(data._id, { isLogin: true })
          .then((resp) => {
            // console.log(resp);
            const token = jwt.sign(
              { id: resp._id, name: resp.name, email: resp.email },
              "newton_School_Linkedin"
            );
            res.status(200).json({
              id: resp._id,
              name: resp.name,
              email: resp.email,
              token,
            });
          })
          .catch((err) => {
            res.status(500).send({ message: "something went wrong" });
          });
      } else res.status(200).json({ token: null });
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send({ Message: "Something went wrong" });
    });
};

module.exports = { newUser, isEmailExist, loginUser, logoutUser };
