const express=require("express");
const { getData } = require("../controller/initialDataController");

const router=express.Router();


router.route("/").get(getData);
module.exports = router;