const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema({
  name: {
    type:  String,
  },
  image: {
    type: String,
    default: "/images/No_Image_Available.jpg",
  },
  ingredients: {
    spirits: {
      type: Object,
      default: undefined,
    },
    decoration: {
      type: String,
      default: undefined,
    },
    others: {
      type: Object,
      default: undefined,
    },
  },
  method: Number,
  glass: Number,
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: "unknown",
  },
});

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

module.exports = Cocktail;
