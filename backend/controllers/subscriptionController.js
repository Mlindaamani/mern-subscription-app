const Subscription = require("../models/Subscription");

exports.subscribe = async (req, res) => {
  const allowedPlans = ["basic", "premium", "standard", "meru"];

  const { plan } = req.body;
  if (!allowedPlans.includes(plan)) {
    return res.status(400).json({
      message: `${plan} is not a valid plan. Allowed plans are: ${allowedPlans.join(
        ", "
      )}`,
    });
  }

  try {
    //Check whether a user has already
    const userSubscription = await Subscription.findOne({ user: req.user.id });

    if (userSubscription != null && userSubscription.plan === plan) {
      return res.status(404).json({
        error: true,
        success: false,
        message:
          "Looks like you have already subscribe. Kindly upgrade your plan",
      });
    } else {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
