const { connect } = require("mongoose");
const url =
  "mongodb+srv://aakashjimkanpur:Aakash3105@aakash.8frxkfm.mongodb.net/newtonDB";
connect(url)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
