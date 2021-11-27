const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  assetCategory: {
    type: String,
    required: [true, "Category required"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
