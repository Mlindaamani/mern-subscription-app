const mongoose = require("mongoose");

const connnectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✔️  You have successfully connected to MongoDb!");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { connnectToMongoDb };
