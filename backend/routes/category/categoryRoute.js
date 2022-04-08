const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category/categoryController");

router.get("/getCategoryDetails", categoryController.getCategoryDetails);
router.post("/insertCategoryDetails", categoryController.insertCategoryDetails);
router.put(
  "/updateCategoryDetails/:id",
  categoryController.updateCategoryDetails
);
router.delete(
  "/deleteCategoryDetails/:id",
  categoryController.insertCategoryDetails
);
module.exports = router;
