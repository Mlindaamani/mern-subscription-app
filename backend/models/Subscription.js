const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subscriptionSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A content subscriber might be required"],
  },

  plan: {
    type: String,
    enum: {
      values: ["basic", "premium", "standard", "meru"],
      message: "{VALUE} is not a valid plan",
    },
    required: [true, "Plan is required"],
    unique: true,
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  endDate: {
    type: Date,
    require: [false, "This field is not mandatory. You can skip it"],
  },

  isActive: {
    type: Boolean,
    default: false,
  },
});

const subscription = model("Subscription", subscriptionSchema);
module.exports = { subscription };

// subscriptionSchema.methods.getActiveSubscription = function () {
//   this.isActive = true;
// };

// subscriptionSchema.methods.activateSubscription = function (value) {
//   this.plan = value;
// };

// subscriptionSchema.virtual("userSubscriptionPlan").get(function () {
//   return this.plan;
// });

// export const getPlanPrice = (plan) => {
//   const prices = {
//     basic: 20,
//     standard: 60,
//     premium: 100,
//   };
//   return prices[plan] || 0;
// };

// export const calculateProratedAmount = (currentPrice, newPrice, startDate) => {
//   // let's assume a monthly billing cycle
//   const daysInMonth = 30;
//   const daysUsed = (Date.now() - new Date(startDate)) / (1000 * 60 * 60 * 24);
//   const remainingDays = daysInMonth - daysUsed;
//   const proratedCurrent = (currentPrice / daysInMonth) * remainingDays;
//   return newPrice - proratedCurrent;
// };
