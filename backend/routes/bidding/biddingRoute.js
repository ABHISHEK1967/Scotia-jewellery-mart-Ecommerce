const express = require("express");
const router = express.Router();
const biddingController = require("../../controllers/bidding/biddingController");

router.get("/getBiddingProductById/:id", biddingController.getBiddingProductById);
router.get("/historyBidding/:userId", biddingController.biddingHistory);

router.put("/updateBiddingProductById/:id", biddingController.updateBiddingProducts);

router.get("/getAllBiddingProducts", biddingController.getAllBiddingProducts);
router.post("/getBiddersDetails", biddingController.getBiddersDetails);
router.get("/getAllBidders", biddingController.getAllBidders);
router.get("/getBiddersByProductId/:id", biddingController.getBiddersByProductId);
router.get("/getHighestBiddedAmountByProductId/:id",biddingController.getHighestBiddedAmountByProductId);
router.get("/getAvailableBiddingProducts", biddingController.getAvailableBiddingProducts);
router.post("/createBiddingProduct", biddingController.createBiddingProduct);
router.post("/placeABid", biddingController.placeABid);




module.exports = router;