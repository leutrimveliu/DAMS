const express = require("express");
const Asset = require("../models/Assets");
const Register = require("../models/User");
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


const validationChecks = [
  check("assetCode", "Asset code can not be empty!").not().isEmpty(),
  check("assetCategory", "Event Location can not be empty!").not().isEmpty(),
  check("assetDescription", "Event Category can not be empty!").not().isEmpty(),
  check("assetModel", "Event Location can not be empty!").not().isEmpty(),
  check("assetSerialNo", "Event Category can not be empty!").not().isEmpty(),
  check("assetSupplier", "Event Location can not be empty!").not().isEmpty(),
  check("price", "Event Category can not be empty!").not().isEmpty(),
  check("deliveryDate", "Event Location can not be empty!").not().isEmpty(),
  check("donorName", "Event Location can not be empty!").not().isEmpty(),
  check("projectName", "Event Category can not be empty!").not().isEmpty(),
  check("assetLocation", "Event Location can not be empty!").not().isEmpty(),
  check("roomNo", "Event Category can not be empty!").not().isEmpty(),
  check("assetHolder", "Event Location can not be empty!").not().isEmpty(),
  check("assetAvailability", "Asset code can not be empty!").not().isEmpty(),

];

router.put("/:id", verifyToken, validationChecks, function (req, res) {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      console.log("Unaothorized User");
      res.sendStatus(403);
    } else {
      try {
        const compareUserId = authData.user._id;
        // Check if user_id of the event has been maliciously modified
        if (compareUserId == req.body.user_id) {
          Register.findById(compareUserId, async function (err, user) {
            if (err) return err;
            const validateRoleId = await user.role_id;
            Asset.findById(req.params.id, async function (err, asset) {
              if (err) return err;
              const validateEventId = await asset.user_id;
              // Check if this user is the user who created the event or is an admin
              if (
                compareUserId == validateEventId ||
                validateRoleId == "61448b464e8fb8a517a8dfb7"
              ) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  console.log(errors);
                
                  
                  res.json(errors);
                } else {
                   
                    Asset.findByIdAndUpdate(
                      req.params.id,
                      {
                        assetCode: req.body.assetCode,
                  assetCategory: req.body.assetCategory,
                  assetDescription: req.body.assetDescription,  
                  assetModel: req.body.assetModel,
                  assetSerialNo: req.body.assetSerialNo,
                  assetSupplier: req.body.assetSupplier,  
                  price: req.body.price,
                  deliveryDate: req.body.deliveryDate,
                  donorName: req.body.donorName,  
                  projectName: req.body.projectName,
                  assetLocation: req.body.assetLocation,
                  roomNo: req.body.roomNo,  
                  assetHolder: req.body.assetHolder,
                  assetAvailability: req.body.assetAvailability,
                      },
                      (error, data) => {
                        // if (error) return next(error);
                        if (error) return error;
                        res.json("Asset Updated successfully!");
                      }
                    );
                  }
                
              } else {
                console.log("You are not permitted to change this event!");
              }
            });
          });
        }
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
  });
});

router.get("/:id", verifyToken, function (req, res, next) {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      console.log("Unaothorized User");
      res.sendStatus(403);
    } else {
      try {
        const compareUserId = authData.user._id;
        // Check if user_id of the event has been maliciously modified
        if (compareUserId == req.body.user_id) {
          Register.findById(compareUserId, async function (err, user) {
            if (err) return next(err);
            const validateRoleId = await user.role_id;

            Asset.findById(req.params.id, async function (err, asset) {
              if (err) return next(err);
              const validateEventId = await asset.user_id;
              // Check if this user is the user who created the event
              if (
                compareUserId == validateEventId 
                ||
                validateRoleId == "61448b464e8fb8a517a8dfb7"
              ) {
                Asset.find(req.params.id, function (err, asset) {
                  if (err) return next(err);
                  res.json(asset);
                });
              } else {
                console.log("You are not permitted to delete this event!");
              }
            });
          });
        }
        
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
  });
});

router.delete("/:id", verifyToken, function (req, res, next) {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      console.log("Unaothorized User");
      res.sendStatus(403);
    } else {
      try {
        const compareUserId = authData.user._id;
        // Check if user_id of the event has been maliciously modified
        if (compareUserId == req.body.user_id) {
          Register.findById(compareUserId, async function (err, user) {
            if (err) return next(err);
            const validateRoleId = await user.role_id;

            Asset.findById(req.params.id, async function (err, asset) {
              if (err) return next(err);
              const validateEventId = await asset.user_id;
              // Check if this user is the user who created the event
              if (
                compareUserId == validateEventId ||
                validateRoleId == "61448b464e8fb8a517a8dfb7"
              ) {
                Asset.findByIdAndRemove(req.params.id, (error, data) => {
                  if (error) return next(error);
                  res.json("Event Has been deleted!");
                });
              } else {
                console.log("You are not permitted to delete this event!");
              }
            });
          });
        }
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
  });
});

module.exports = router;
