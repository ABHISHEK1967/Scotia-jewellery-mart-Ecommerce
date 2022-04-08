const express = require("express");
const router = express.Router();
const reviewsController = require("../../controllers/product-review/product-reviewController");

router.get("/getReviews/:id", reviewsController.getReviews);

router.post("/insertReview/:id", reviewsController.insertReviews);

router.delete("/deleteReview/:id",reviewsController.deleteReview);

module.exports = router;