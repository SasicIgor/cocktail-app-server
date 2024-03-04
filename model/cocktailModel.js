const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema({
  name: {
    type:  String,
  },
  // image: {
  //   type: String,
  //   default: `${__dirname}/images/No_Image_Available`,
  // },
  // ingredients: {
  //   spirits: {
  //     type: Object,
  //     default: undefined,
  //   },
  //   juice: {
  //     type: Object,
  //     default: undefined,
  //   },
  //   decoration: {
  //     type: Object,
  //     default: undefined,
  //   },
  //   others: {
  //     type: Object,
  //     default: undefined,
  //   },
  // },
  method: Number,
  glass: Number,
  author: {
    type: String,
    default: "unknown",
  },
});

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

module.exports = Cocktail;
