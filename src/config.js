import "dotenv/config";

export default {
  mongo: {
    connectDB: process.env.connectDB
  }
};
