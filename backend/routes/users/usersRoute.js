const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users/usersController");

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/profile/:id",userController.profile);
router.get("/getallusers",userController.getallusers);
router.put("/editprofile",userController.editprofile);
router.put("/changepassword",userController.changepassword);
router.post("/forgotpassdetails",userController.forgotpassdetails);
router.post("/address/add",userController.addaddress);
router.get("/address/all/:id",userController.getalladdressbyuser);
router.delete("/address/delete/:id",userController.deleteaddressbyid);
router.delete("/deleteprofile/:id",userController.deleteprofile);

module.exports=router;