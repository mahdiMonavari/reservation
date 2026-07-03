import mongoose from "mongoose";

const schema = mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  count: {
    trpe: Number,
    required: true,
    default: 5,
  },
  type: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
});

const limitRateModel =
  mongoose.models.LimitRate || mongoose.model("LimitRate", schema);

export default limitRateModel;
