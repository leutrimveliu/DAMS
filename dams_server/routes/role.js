var Role = require("../models/Role");
var express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var router = express.Router();
const { validationResult, check } = require("express-validator");

// /* GET ALL Roles */
router.get("/", function (req, res, next) {
  Role.find(function (err, role) {
    if (err) return next(err);
    res.json(role);
  });
});


module.exports = router;