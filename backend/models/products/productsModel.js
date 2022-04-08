const mongoose = require("mongoose");
const { ProductReview } = require("../product-review/product-ReviewsModel");



const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  About: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // for our 
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,},
  // },
  // reviews: [
  //   {
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref: "Reviews"
  //   }
  // ],
  isFlash: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual("id").get(function() {
  return this._id.toHexString();   // so that Object Id is changed to string in mongo to make it more readable readable
});

productSchema.set("toJSON", {
  virtuals: true,   // by default virtual id is not stored in db.. but doing dso will store it in db
});

exports.Product = mongoose.model("Product", productSchema);
