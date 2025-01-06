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

module.exports = model("Subscription", subscriptionSchema);

subscriptionSchema.methods.getActiveSubscription = function () {
  this.isActive = true;
};

subscriptionSchema.methods.activateSubscription = function (value) {
  this.plan = value;
};

subscriptionSchema.virtual("userSubscriptionPlan").get(function () {
  return this.plan;
});
