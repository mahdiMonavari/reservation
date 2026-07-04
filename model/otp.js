const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    expTime: {
      type: Date,
      required: true,
      expires: 0,
    },
    attempt: {
      type: Number,
      required: true,
      default: 3,
    },
  },
  { timestamps: true },
);

const otpModel = mongoose.models.Otp || mongoose.model("Otp", schema);

export default otpModel;
