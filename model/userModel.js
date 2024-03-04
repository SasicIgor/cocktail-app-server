const mongoose = require("mongoose");
const validator=require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    lowercase:true,
    validate:[validator.isEmail,"please provide a valid email"]
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirmed: {
    type: String,
    required: true,
  },
});

const User=mongoose.model('User',userSchema);

module.exports=User;

