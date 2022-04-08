const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  reviewdate:{
    type:String
  },
  rating:{
    type:Number,
    default:5,
    min:0,
    max:5,
  },
  description:{
    type:String,
  },
  images:
    [
      {
        type: String,
      },
    ]
});

reviewsSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

reviewsSchema.set("toJSON", {
  virtuals: true,
});


exports.ProductReview = mongoose.model('ProductReview', reviewsSchema);