import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    isVisited: {
      type: Boolean,
      default: false,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    serviceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    totalTime: {
      type: String,
      required: true,
    },
    timeStart: {
      type: String,
      required: true,
    },
    timeEnd: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isRescheduled: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const appointmentModel =
  mongoose.models.Appointment || mongoose.model("Appointment", schema);

export default appointmentModel;
