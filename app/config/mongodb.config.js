const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(
        MONGO_URL,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        },
      );
      console.log(`mongoDb connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error got ${error.message}`);
      process.exit();
    }
  };
  
  module.exports = connectDB;
  

