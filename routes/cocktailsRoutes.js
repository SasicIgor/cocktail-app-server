const express = require("express");
const {
  getAllCocktails,
  addNewCocktail,
  getCocktail,
  updateCocktail,
  deleteCocktail,
  getCocktailsByAuthor
} = require("./../controller/cocktailsController");
const {validateToken}=require("./../utils/auth")


const router = express.Router();

router.route("/").get(getAllCocktails);

router.route("/:id").get(getCocktail).patch(updateCocktail).delete(deleteCocktail);

router.route("/:id/editCocktail")

router.route("/contributors/:author").get(getCocktailsByAuthor);

router.route("/contributors/makeCocktail").post(validateToken, addNewCocktail);
module.exports = router;


// validateToken, 
