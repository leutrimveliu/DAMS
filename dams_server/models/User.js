const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
    default: "61448b884e8fb8a517a8dfb9",
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
