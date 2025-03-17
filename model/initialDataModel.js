const mongoose = require("mongoose");

const initialDataSchema = new mongoose.Schema({
  glasses: {
    type: {
      type: Map,
      of: String,
    },
  },
  methods: {
    type: {
      type: {
        type: Map,
        of: String,
      },
    },
  },
});

const InitialData = mongoose.model("InitialData", initialDataSchema);

module.exports = InitialData;
