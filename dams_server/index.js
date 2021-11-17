const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/DB");
const assets = require("./routes/assets");
const register = require("./routes/register");
const editAsset = require("./routes/editAsset");
const getAssets =require ("./routes/getAssets");
const login = require("./routes/auth");
const role = require("./routes/role");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/register", register);
app.use("/editAsset", editAsset);
app.use("/getAssets", getAssets);
app.use("/auth", login);
app.use("/assets", assets);
app.use("/role", role);

var port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log("NodeJS Server Port: ", port);
});
