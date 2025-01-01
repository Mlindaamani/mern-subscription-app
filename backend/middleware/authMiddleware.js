const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.userIsAuthenticatedMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "No token, access denied. Please  login or signup" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload.id });
    req.user = { id: user._id, role: user.role, hasPaid: user.hasPaid };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied! You need more privileges" });
  }
};

exports.userIsACreatorMiddleware = (req, res, next) => {
  if (req.user.role !== process.env.CREDOR_SYS_USER)
    return res.status(403).json({ message: "Access Denied" });
  next();
};
