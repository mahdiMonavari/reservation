import mongoose from "mongoose";

const schema = new mongoose.Schema({    
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Doctor"
    },
    date: {
        type: Date,
        required: true,
    },
    timeStart:{
        type: String,
        required: true
    },
    timeEnd: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const workingDayModel = mongoose.models.WorkingDay || mongoose.model("WorkingDay", schema)

export default workingDayModel;
