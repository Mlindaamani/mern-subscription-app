const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/functions");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      role: role || "user",
      password: await bcryptjs.hash(password, 10),
    });

    return res.status(201).json({ success: true, errors: false, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "No user found with given credentials",
      });
    }

    const passwordMatches = await bcryptjs.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid email or password",
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        role: user.role,
        hasPaid: user.hasPaid,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(payload);
    res.json({ accessToken });
  });
};

module.exports = { register, login, refreshToken };
