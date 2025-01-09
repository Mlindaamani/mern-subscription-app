const { User } = require("../models/User");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sorry an error has occured. Please try again later" });
  }
};

const getUserById = async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    res
      .status(200)
      .json({ success: true, message: "User found in the system", data: user });
  }
};

const profile = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const profile = await User.findOne({ _id: userId }).select("-password");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      profile: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the profile. Try again later",
    });
  }
};

module.exports = { getAllUsers, getUserById, profile };
