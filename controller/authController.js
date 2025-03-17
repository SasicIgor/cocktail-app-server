const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");
const {signToken, validateToken} = require("./../utils/auth");

const signup = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "Username already exist.",
      });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        status: "fail",
        message: "email address already in use",
      });
    }

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmed: req.body.passwordConfirmed,
    });
    const token = signToken(newUser._id);
    return res.status(200).json({
      status: "success",
      token,
      data: newUser.username,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail3",
      message: err,
    });
  }
};

const login = async (req, res, next) => {
  try {
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
      data: user.username,
      message: "Your login attempt was successfull"
    });
  } catch (err) {
    res.status(400).json({
      message:err
    })
  }
};

module.exports = {
  signup,
  login,
};
