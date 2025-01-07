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
    let userSubscription = await Subscription.find({ user: req.user.id });
  

    if (userSubscription.length === 0) {
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
      return res.status(200).json({
        message: `You have already subscribed to this plan (${plan})`,
      });
    }

    // if (userSubscription.plan === plan) {
    //   userSubscription.plan = plan;
    //   await userSubscription.save();

    //   return res.status(200).json({
    //     message: `You have successfully upgraded your plan to  ${plan}`,
    //   });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { subscribe };
