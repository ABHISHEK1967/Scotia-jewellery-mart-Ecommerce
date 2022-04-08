/* Authored by Meshwa Savalia, B00890170, ms959884@dal.ca
 */

const mongoose = require('mongoose');
const productScehema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: Number,
});
const cartSchema = mongoose.Schema({

      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      products: [productScehema],
})

cartSchema.virtual("id").get(function() {
    return this._id.toHexString();
  });
  
  cartSchema.set("toJSON", {
    virtuals: true,
  });

exports.Cart = mongoose.model('Cart', cartSchema);
