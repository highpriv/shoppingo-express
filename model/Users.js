// ? Node modules.
const { required } = require("joi");
const { ObjectID, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
AutoID = mongoose.Types.ObjectId;

// ? Schema.
const usersSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectID,
      required: false,
      default: AutoID,
    },
    name: String,
    lastname: String,
    phone: String,
    birthday: Date,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    registered: {
      type: Date,
      required: false,
      default: Date.now,
    },
    status: {
      type: String,
      required: false,
      enum: ["Active", "InActive", "Pending", "Banned", "Delete"],
      default: "Pending",
    },
    permissions: {
      type: Array,
      required: false,
      default: [],
    },
    role: {
      type: String,
      enum: ["user", "guest"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

usersSchema.virtual("allOrders", {
  ref: "Orders",
  localField: "_id",
  foreignField: "userID",
});

// TODO User Model
module.exports = mongoose.model("Users", usersSchema, "users");
