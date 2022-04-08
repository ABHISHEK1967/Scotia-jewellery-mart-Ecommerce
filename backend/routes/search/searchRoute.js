/*
Authored by Xiao Ling, B00877105, xz540782@dal.ca
 */

const express = require("express");
const router = express.Router();
const searchController = require("../../controllers/search/searchController");

router.post("/filter", searchController.getProductByFilters);
router.post('/bidding/filter', searchController.getBiddingProductByFilters);

// Testing
// const searchTest = require("../../controllers/search/searchTest");
// router.post('/test', searchTest.testAdd);

module.exports = router;
