import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Doctor"
    },    
    serviceIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }],
    totalTime: {
        type: String,
        required: true
    },
    timeStart: {
        type: String,
        required: true
    },
    timeEnd:{
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const appointmentModel = mongoose.models.Appointment || mongoose.model("Appointment", schema)

export default appointmentModel;
