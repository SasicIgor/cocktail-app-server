const Cocktail = require("../model/cocktailModel");

const getAllCocktails = async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.status(200).json({
      status: "success",
      results: cocktails.length,
      data: {
        cocktails,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const addNewCocktail = async (req, res) => {
  console.log(1);
  try {
    console.log(2);
    console.log(req.body)
    const newCocktail = await Cocktail.create(req.body);
    res.status(201).json({
      status: "success",
      data: newCocktail
    });
    console.log(3);
  } catch (err) {
    console.log(4);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const getCocktail = async (req, res) => {
  try {
    console.log(1)
    const cocktail = await Cocktail.findById(req.params.id);
    console.log(cocktail)
    res.status(200).json({
      status: "success",
      data: cocktail,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const updateCocktail = async (req, res) => {
  try {
    const cocktail = await Cocktail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(cocktail);
    res.status(200).json({
      status: "success",
      data: cocktail,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const deleteCocktail = async (req, res) => {
  try {
    await Cocktail.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: []
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getCocktailsByAuthor = async (req,res) =>{
  try{
    let user=req.params
    const cocktail= await Cocktail.find(user);
    console.log(cocktail)
    res.status(200).json({
      status:"success",
      data:cocktail
    })
  }catch (err){
    res.status(404).json({
      status:"fail",
      message: err
    })
  }

}

module.exports = {
  getAllCocktails,
  addNewCocktail,
  getCocktail,
  updateCocktail,
  deleteCocktail,
  getCocktailsByAuthor
};
