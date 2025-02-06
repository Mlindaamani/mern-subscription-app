const { Subscription } = require("../models/Subscription");

const subscribe = async (req, res) => {
  const allowedPlans = ["basic", "premium", "standard", "meru"];
  const { plan } = req.body;
  const { id: userId } = req.user;

  if (plan != null && !allowedPlans.includes(plan)) {
    return res.status(400).json({
      message: `${plan} is not a valid plan. Allowed plans are: ${allowedPlans.join(
        ", "
      )}`,
    });
  }

  try {
    let userSubscription = await Subscription.findOne({ user: userId });

    if (!userSubscription) {
      await Subscription.create({
        user: req.user.id,
        plan,
        isActive: true,
      });

      return res.status(200).json({
        message: `You have successfully subscribed to the ${plan} plan`,
      });
    }

    if (userSubscription.plan === plan) {
      userSubscription.plan = plan;
      await userSubscription.save();

      return res.status(200).json({
        message: `You have successfully upgraded your plan to  ${plan}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { subscribe };

// // Upgrade a user's subscription plan
// exports.upgradeSubscription = async (req, res) => {
//   try {
//     const { userId, newPlan } = req.body;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User  not found" });
//     }

//     // Find the current subscription
//     const currentSubscription = await Subscription.findOne({ user: userId });
//     if (!currentSubscription) {
//       return res.status(400).json({ message: "User  does not have an active subscription" });
//     }

//     // Check if the new plan is different from the current plan
//     if (currentSubscription.plan === newPlan) {
//       return res.status(400).json({ message: "You are already subscribed to this plan" });
//     }
