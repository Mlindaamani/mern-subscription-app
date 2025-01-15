const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/functions");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @param {Request} req
 * @param {Response} res
 */
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

    return res
      .status(201)
      .json({ success: "Successfully created Account!", user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with given credentials" });
    }

    const passwordMatches = await bcryptjs.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: user._id,
      name: user.username,
      role: user.role,
      hasPaid: user.hasPaid,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      user: payload,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  // Check if refresh token is provided
  if (!refreshToken) {
    return res.status(400).json({ message: "Provide a refresh token!" });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid refresh token!" });
    }

    // If the refresh token is valid, generate a new access token
    const payload = {
      id: user._id,
      name: user.username,
      role: user.role,
      hasPaid: user.hasPaid,
    };

    const accessToken = generateAccessToken(payload);
    res.status(200).json({ accessToken });
  });
};

module.exports = { register, login, refreshToken };
