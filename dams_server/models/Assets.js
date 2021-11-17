const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const assetSchema = mongoose.Schema({
   
  assetNr:{
    type: Number,
    // required: [true, "Asset number required"],
     default:1,
    unique:true,
  },
  assetCategory:{
    type: String,
    required: [true, "Asset category required"],
  },
  assetDescription:{
    type: String,
    required: [true, "Asset description required"],
  },
  assetModel:{
    type: String,
    required: [true, "Asset model required"],
  },
  assetSerialNo:{
    type: String,
    required: [true, "Asset serial number required"],
  },
  assetSupplier:{
    type: String,
    required: [true, "Asset Supplier required"],
  },
  price: {
    type: Number,
    required: [true, "Price required"],
  },
  deliveryDate: {
    type: Date,
    required: [true, "Asset delivery date required"],
   
  },
  publishDate: {
    type: Date,
    required: [true, "Asset published date required"],
    default: Date.now,
  },
  donorName:{
    type: String,
    required: [true, "donor name required"],
  },
  projectName:{
    type: String,
    required: [true, "Project Name required"],
  },
  assetLocation:{
    type: String,
    required: [true, "Location required"],
  },
  roomNo:{
    type: String,
    required: [true, "Room number required"],
  },
  assetHolder:{
    type: String,
    required: [true, "Asset Holder required"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

assetSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'assetNr'});
module.exports = mongoose.model("Assets", assetSchema);
