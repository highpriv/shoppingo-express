const CouponCodeModel = require("../model/CouponCode");

const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const Search = require("../model/Search");
AutoID = mongoose.Types.ObjectId;



const schemaOrders = new mongoose.Schema(
  {
    _id: {
      type: ObjectID,
      required: true,
      default: AutoID,
    },
    productID:{
        type: ObjectID,
        required: true,
        default: null,
        ref: "Products"
    },
    purchaseDateTime: {
      type: Date,
      required: false,
    },
    orderCode: {
      type: String,
      required: true,
      default: null,
      unique: true,
    },
    userID: {
      type: ObjectID,
      required: false,
      default: null,
      ref: "Users",
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
        "refunded"
      ],
      default: "pending",
    },
    refund: {
      date: Date,
      message: String,
      refundedPrice: Object,
      status: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
    autoIndex: false,
    strict: false,
  }
);

module.exports = mongoose.model("Orders", schemaOrders, "orderds");
