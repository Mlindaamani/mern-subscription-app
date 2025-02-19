const { User } = require("../models/User");
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Responsev
 */

/**
 * @param {Request} req
 * @param {Response} res
 */
const getSidebarUsers = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const filteredUsers = await User.find({ _id: { $ne: userId } })
      .select("-password")
      .sort({ username: -1 });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

module.exports = { getSidebarUsers };
