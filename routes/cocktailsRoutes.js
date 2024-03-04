const express = require("express");
const {
  getAllCocktails,
  addNewCocktail,
  getCocktail,
  updateCocktail,
  deleteCocktail,
} = require("./../controller/cocktailsController");
const {signup}=require("./../controller/authController")

const router = express.Router();

router.post("/signup", signup)

router.route("/").get(getAllCocktails).post(addNewCocktail);

router.route("/:id").get(getCocktail).patch(updateCocktail).delete(deleteCocktail);

module.exports = router;
