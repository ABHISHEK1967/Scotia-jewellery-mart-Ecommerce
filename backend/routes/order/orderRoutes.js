const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order/OrderController");


router.get("/getOrderDetails", orderController.getOrderDetails);
router.post("/saveOrderDetails", orderController.saveOrderDetails);
router.post("/createCheckoutSession", orderController.createCheckoutSession);

module.exports = router;
