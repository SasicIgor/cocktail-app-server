const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

function verifyToken(token) {
  const code = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, code);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not authenticated.",
    });
  }

  const result = verifyToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  console.log(result);
  req.user = result.data;
  next();
};

module.exports = {
  signToken,
  validateToken,
};
