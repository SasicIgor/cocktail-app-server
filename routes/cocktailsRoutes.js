const express = require("express");
const {
  getAllCocktails,
  addNewCocktail,
  getCocktail,
  updateCocktail,
  deleteCocktail,
} = require("./../controller/cocktailsController");
const {signup, login}=require("./../controller/authController")

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login) 

router.route("/").get(getAllCocktails).post(addNewCocktail);

router.route("/:id").get(getCocktail).patch(updateCocktail).delete(deleteCocktail);

module.exports = router;
