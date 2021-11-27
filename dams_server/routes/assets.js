const Assets = require("../models/Assets");
const Register = require("../models/User");
const Category = require("../models/Category");
const express = require("express");
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
router.get("/", function (req, res, next) {
   Category.findOne({
    eventCategory: req.query.category,
  });
  Assets.find(function (err, asset) {
    if (err) return next(err);
    res.json(asset);
  });
});

const validationChecks = [
  check("assetCode", "Asset code can not be empty!").not().isEmpty(),
  check("assetCategory", "Asset Category can not be empty!").not().isEmpty(),
  check("assetDescription", "Asset Description can not be empty!").not().isEmpty(),
  check("assetModel", "Asset Model can not be empty!").not().isEmpty(),
  check("assetSerialNo", "Asset Serial No can not be empty!").not().isEmpty(),
  check("assetSupplier", "Asset Supplier can not be empty!").not().isEmpty(),
  check("price", "Asset price can not be empty!").not().isEmpty(),
  check("deliveryDate", "Asset delivery date can not be empty!").not().isEmpty(),
  check("donorName", "Donor Name can not be empty!").not().isEmpty(),
  check("projectName", "Project name can not be empty!").not().isEmpty(),
  check("assetLocation", "Asset Location can not be empty!").not().isEmpty(),
  check("roomNo", "Room number can not be empty!").not().isEmpty(),
  check("assetHolder", "Asset Holder can not be empty!").not().isEmpty(),
  check("assetAvailability", "Asset code can not be empty!").not().isEmpty(),
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
          Register.findById(compareUserId, async function (err, event) {
            if (err) return err;
            const validateRoleId = await event.role_id;

            if (validateRoleId == "61448b5a4e8fb8a517a8dfb8") {
              const errors = validationResult(req);

              if (!errors.isEmpty()) {
                console.log(errors);
                
               
                res.json({
                  successMessage: false,
                  errMessage: errors,
                });
              } else {

                const asset = new Assets({
                   assetCode: req.body.assetCode,  
                  // assetOldNr: req.body.assetOldNr,
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
                  user_id: req.body.user_id,
                });

                await asset.save();

                // res.json("file uploaded");
                res.json({
                  successMessage: "You have created an asset successfully!",
                  errMessage: false,
                });
              }
            } else {
              console.log("You dont have permission to create an asset!");
            }
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
            Assets.findById(req.params.id, async function (err, asset) {
              if (err) return next(err);
              const validateProductId = await asset.user_id;
              // Check if this user is the user who created the event
              if (compareUserId == validateProductId) {
                Assets.findByIdAndRemove(req.params.id, (error, data) => {
                  if (error) return error;
                  res
                    .status(200)
                    .json({ successMessage: `This asset is deleted` });
                });
              } else {
                console.log("You are not permitted to delete this asset!");
                res.status(500).json({
                  errorMessage: `You are not permitted to delete this asset!`,
                });
              }
            });
          });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({ errorMessage: `Can not found this product` });
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
//         // Check if user_id of the event has been maliciously modified
//         if (compareUserId == req.body.user_id) {
//           Register.findById(compareUserId, async function (err, user) {
//             if (err) return err;

//             Assets.findById(req.params.id, async function (erro, asset) {
//               if (erro) return erro;
//               const validateProductId = await asset.user_id;
//               // Check if this user is the user who created the event or is an admin
//               if (compareUserId == validateProductId) {
//                 const errors = validationResult(req);
//                 if (!errors.isEmpty()) {
//                   console.log(errors);

//                   res.json(errors);
//                 } else {
//                   Assets.findByIdAndUpdate(
//                     req.params.id,
//                     {
//                       title: req.body.title,
//                       price: req.body.price,
//                       stock: req.body.stock,
//                     },
//                     (error, data) => {
//                       // if (error) return next(error);
//                       if (error) return error;
//                       res.status(200).json({
//                         successMessage: `This product is updated successfully`,
//                       });
//                     }
//                   );
//                 }
//               } else {
//                 console.log("You are not permitted to change this product!");
//               }
//             });
//           });
//         }
//       } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//       }
//     }
//   });
// });

router.get("/:id", function (req, res, next) {
  Assets.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
