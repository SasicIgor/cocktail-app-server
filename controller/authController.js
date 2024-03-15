const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {

  try{
    const newUser = await User.create({
      username: req.body.username,
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
  }catch(err){
    res.status(401).json({
      status:"fail",
      message: err
    })
  }


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

// work  in progress
// const forgotPassword = async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next("error 404");
//   }

//   const resetToken = user.resetPasswordToken();
//   await user.save({ validateBeforeSave: false });

//   const resetURL = `${req.protocol}://${req.get(
//     "host"
//   )}/users/resetPassword/${resetToken}`;

//   const message = `Forgot your password? Submit a PATCH request with your new password and password Confirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Your password reset token (valid for 3 min)",
//       message,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Token sent to email!",
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave:false });

//     return next(err);
//   }
// };

// const resetPassword = (req, res, next) => {};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
