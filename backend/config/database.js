const mongoose = require("mongoose");

const connnectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Success! Connected to MongoDb database...");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { connnectToMongoDb };
