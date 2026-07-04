import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    photo: { type: String, default: null },
    specialty: { type: String, default: null },
    about: { type: String, default: null },
    fieldOfStudy: { type: String, default: null },
    experience: { type: Number, min: 0, default: null },
    avgAppointmentTime: { type: Number, min: 0, default: 15 },
    baseFee: { type: Number, min: 0, default: null },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: false },
    defaultStartHour: { type: String, default: "09:00" },
    defaultEndHour: { type: String, default: "13:00" },
  },
  { timestamps: true },
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default doctorModel;
