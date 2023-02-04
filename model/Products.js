const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
AutoID = mongoose.Types.ObjectId;
const { Schema } = mongoose;
var productsSchema = new Schema({
  _id: {
    type: ObjectID,
    required: false,
    default: AutoID,
  },
  image: {
    type: String,
    required: false,
    default: "default_img.png",
  },
  price: {
    type: Object,
    require: true
  },
  title: {
    type: Object,
    required: true,
  },
  slug: {
    type: Object,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  description: {
    type: Object,
    required: true,
  },
  rating: {
    type: Object,
    required: true,
  },
  category: {
    type: Object,
    enum: [
      { tr: "Giyim", en: "Cloths" }, { tr: "Elektronik", en: "Electronical" }, { tr: "Mobilya", en: "Furniture" }, { tr: "Pet Shop", en: "Pet Shop" }
    ],
    required: true
  }

});
productsSchema.index({ model: "text" });
module.exports = mongoose.model("Products", productsSchema, "products");
