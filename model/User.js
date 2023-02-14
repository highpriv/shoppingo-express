// ? Node modules.
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

AutoID = mongoose.Types.ObjectId;

// ? Schema.
const userSchema = new mongoose.Schema(
  {
    id: AutoID,
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
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("allOrders", {
  ref: "Orders",
  localField: "_id",
  foreignField: "userID",
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// TODO User Model
module.exports = mongoose.model("User", userSchema, "user");
