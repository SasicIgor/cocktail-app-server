const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmed: req.body.passwordConfirmed,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: newUser,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid request",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  const passwordCheck = await user.correctPassword(password, user.password);

  if (!user || !passwordCheck) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid credentials",
    });
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: [],
  });
};

module.exports = {
  signup,
  login,
};
