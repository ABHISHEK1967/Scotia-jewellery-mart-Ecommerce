/* Authored by Meshwa Savalia, B00890170, ms959884@dal.ca
 */
const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart/cartController");


router.get("/getCartDetails", cartController.getCartDetails);
router.post("/addItemToCart", cartController.addItemToCart);
router.put("/deleteItemFromCart", cartController.deleteItemFromCart);
router.put("/updateItemFromCart", cartController.updateItemToCart);
module.exports = router;
