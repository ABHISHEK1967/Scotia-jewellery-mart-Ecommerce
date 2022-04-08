const express = require("express");
const router = express.Router();
const emailController = require("../../controllers/email/emailController");


router.post("/sendEmail", emailController.sendEmail);

module.exports = router;