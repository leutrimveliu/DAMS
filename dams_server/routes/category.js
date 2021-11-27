const Category = require("../models/Category");
const Assets = require("../models/Assets");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Register = require("../models/User");
const { validationResult, check } = require("express-validator");

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
/* GET ALL Category */
router.get("/", function (req, res, next) {
  Category.find(function (err, category) {
    if (err) return next(err);
    res.json(category);
  });
});

/* GET SINGLE Role BY ID */
router.get("/:id", function (req, res, next) {
  Category.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", verifyToken, function (req, res, next) {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      console.log("Unaothorized User");
      res.sendStatus(403);
    } else {
      try {
        console.log(req.params.id)
        // Event.findById(req.params.id, function (err, event) {
        const compareUserId = authData.user._id;
            // Check if user_id of the event has been maliciously modified
        if (compareUserId == req.body.user_id) {
          if (req.body.adm_id == "61448b464e8fb8a517a8dfb7") {
            Assets.find({ assetCategory: req.params.id }, function (err, asset) {
              if (err) return next(err);
              if(asset.length > 0) {
                console.log('u can not delete this category')
                res.json('You can not delete this category!');
                  
              } else {
                Category.findByIdAndRemove(req.params.id, (error, data) => {
                  if (error) return next(error);
                  res.json("Category Has been deleted!");
                });
              }
            });
          } else {
            console.log("You are not permitted to delete this event!");
          }
        }
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
  });
});

const validationChecks = [
  check(
    "assetCategory",
    "assetCategory must be as least 2 characters long!"
  ).isLength({ min: 2 }),
];

router.post("/", verifyToken, validationChecks, function (req, res) {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      console.log("Unaothorized User");
      res.sendStatus(403);
    } else {
      try {
        const compareUserId = authData.user._id;
        // Check if user_id of the event has been maliciously modified
        if (compareUserId == req.body.user_id) {
          // Role.findById(compareUserId, async function (err, event) {
            if (req.body.adm_id == "61448b464e8fb8a517a8dfb7") {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                console.log(errors);
                res.json(errors);
              } else {
                const category = new Category({
                    assetCategory: req.body.assetCategory,
                });

                await category.save();

                res.json("category added");
              }
            } else {
              console.log("You dont have permission to create an category!");
            }
        }
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
  });
});

// router.put("/:id", verifyToken, validationChecks, function (req, res) {
//   jwt.verify(req.token, "secretkey", async (err, authData) => {
   
//     if (err) {
//       console.log("Unaothorized User");
//       res.sendStatus(403);
//     } else {
//       try {

//         const compareUserId = authData.user._id;
     
//         if (compareUserId == req.body.user_id) {
         
//               if (req.body.adm_id == "61448b464e8fb8a517a8dfb7" ) {

              
//               console.log(req.body)
//               Category.findByIdAndUpdate(
                
//                 req.params.id,
//                 {
//                     assetCategory: req.body.assetCategory,
//                 },
//                 (error, data) => {
                 
//                   if (error) return error;
//                   res.json("Category Updated successfully!");
//                 }
//               );
//             }
//           // });
//         }
//       } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//       }
//     }
//   });
// });

module.exports = router;