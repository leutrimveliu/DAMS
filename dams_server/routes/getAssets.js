const express = require("express");
const Asset = require("../models/Assets");
const User = require("../models/User");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();


function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Parse token
    const showToken = JSON.parse(bearerToken);
    // Set the token
    req.token = showToken.token;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

router.get("/:id", verifyToken, function (req, res, next) {
  
    jwt.verify(req.token, "secretkey", async (err, authData) => {
        
      if (err) {
        console.log("Unaothorized User");
        res.sendStatus(403);
      } else {
        try {
            const assets = await Asset.find({ user_id: authData.user._id });
            res.json(assets);
           
        } catch (e) {
          console.error(e);
          res.sendStatus(500);
        }
      }
    });
  });
  module.exports = router;