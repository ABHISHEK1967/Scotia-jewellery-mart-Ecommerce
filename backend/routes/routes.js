/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca) , ABHISHEK KARTHIK MANIKANDAN
=======================================================  */

const express = require("express");
const router = express.Router();
const cartRoutes = require("./cart/cartRoute");
const productRoutes = require("./products/productsRoute");
const categoryRoutes = require("./category/categoryRoute");
const usersRoutes = require("./users/usersRoute");
const sellersRoutes = require("./sellers/sellersRoute");
const biddingRoutes = require("./bidding/biddingRoute");
const searchRoutes = require("./search/searchRoute");
const reviewsRoutes = require("./product-review/productReviewRoute");
const emailRoutes = require("./email/emailRoute");
const orderRoutes = require("./order/orderRoutes");

router.use("/cart", cartRoutes);
router.use("/products", productRoutes);
router.use("/category", categoryRoutes);
router.use("/users", usersRoutes);
router.use("/sellers", sellersRoutes);
router.use("/bidding", biddingRoutes);
router.use("/search", searchRoutes);
router.use("/product-reviews", reviewsRoutes);
router.use("/email", emailRoutes);
router.use("/order", orderRoutes);

module.exports = router;
