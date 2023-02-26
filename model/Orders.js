
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
AutoID = mongoose.Types.ObjectId;

const schemaOrders = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      default: AutoID,
    },
    productID: {
      type: ObjectId,
      required: true,
      default: null,
      ref: "Products",
    },
    purchaseDateTime: {
      type: Date,
      required: true,
      default: new Date()
    },
    orderCode: {
      type: String,
      required: true,
      default: null,
      unique: true,
    },
    userID: {
      type: ObjectId,
      required: false,
      default: null,
      ref: "User",
    },
    lang: {
      type: String,
      require: false,
      default: "tr",
    },
    totalPrice: {
      type: Object,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: [
        "pending",
        "preparing",
        "cancelled",
        "returned",
        "completed",
        "refunded",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
    autoIndex: false,
    strict: false,
  }
);

module.exports = mongoose.model("Orders", schemaOrders, "orderds");
