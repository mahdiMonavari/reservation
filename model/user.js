import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || mongoose.model("User", schema);

export default userModel;
