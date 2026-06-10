import mongoose from "mongoose";
const connectionToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }
    await mongoose.connect("mongodb://127.0.0.1:27017/reservation");
    console.log("DB connected");
  } catch (err) {
    console.log("has error for DB connection");
  }
};

export default connectionToDB;
