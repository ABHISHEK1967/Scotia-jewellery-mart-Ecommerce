const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products/productsController");

router.get("/getProductDetails", productController.getProductDetails);
router.post("/insertProductDetails", productController.insertProductDetails);
router.get(
  "/getProductDetailsById/:id",
  productController.getProductDetailsById
);
router.put(
  "/updateProductDetailsById/:id",
  productController.updateProductDetailsById
);
router.get(
  "/getFlashDealProducts/:count",
  productController.getFlashDealProducts
);

router.post(
  "/uploadImageToCloudinary",
  productController.uploadImageToCloudinary
);
module.exports = router;
