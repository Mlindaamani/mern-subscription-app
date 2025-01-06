const Subscription = require("../models/Subscription");

const subscribe = async (req, res) => {
  const allowedPlans = ["basic", "premium", "standard", "meru"];

  const { plan } = req.body;

  if (plan != null && !allowedPlans.includes(plan)) {

    return res.status(400).json({
      message: `${plan} is not a valid plan. Allowed plans are: ${allowedPlans.join(
        ", "
      )}`,
    });
  }

  try {
    //Check whether a user has already
    const userSubscription = await Subscription.findOne({ user: req.user.id });

    if (!userSubscription) {
      const subscription = await Subscription.create({
        user: req.user.id,
        plan,
        isActive: true,
      });

      return res.status(200).json({
        message: `You have successfully subscribed to the ${plan} plan`,
        subscription,
      });
    }

    if (userSubscription.isActive && userSubscription.plan != plan) {
      const subscription = await Subscription.create({
        user: req.user.id,
        plan,
        isActive: true,
      });

      return res.status(200).json({
        message: `You have successfully upgraded your plan to  ${plan}`,
        subscription,
      });
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        message:
          "Looks like you have already subscribe. Kindly upgrade your plan",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { subscribe };
