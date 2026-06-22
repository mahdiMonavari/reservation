import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    specialty: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 5,
    },
    experience: {
      type: Number,
      required: false,
      min: 0,
    },
    reviewsCount: {
      type: Number,
      required: false,
      min: 0,
      default: 0,
    },
    avgAppointmentTime: {
      type: Number,
      required: false,
      min: 0,
      default: 15,
    },
    baseFee: {
      type: Number,
      required: false,
      min: 0,
    },
    fieldOfStudy: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default doctorModel;
