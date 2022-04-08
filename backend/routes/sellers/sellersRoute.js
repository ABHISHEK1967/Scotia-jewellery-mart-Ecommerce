const express = require("express");
const router = express.Router();
const sellerController = require("../../controllers/sellers/sellersController");

router.post("/register",sellerController.register);
router.post("/login",sellerController.login);
router.get("/profile/:id",sellerController.profile);
router.get("/getallsellers",sellerController.getallsellers)
router.put("/editprofile",sellerController.editprofile);
router.put("/changepassword",sellerController.changepassword);
router.post("/forgotpassword",sellerController.forgotpassword);
router.delete("/delete/:id",sellerController.deletesellerprofile);

module.exports=router;