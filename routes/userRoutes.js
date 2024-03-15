const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("./../controller/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
