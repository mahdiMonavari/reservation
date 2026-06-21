import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USER",
    },
    specialty: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    reviewsCount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    avgAppointmentTime: {
      type: Number,
      required: true,
      min: 0,
      default: 15,
    },
    baseFee: {
      type: Number,
      required: true,
      min: 0,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
