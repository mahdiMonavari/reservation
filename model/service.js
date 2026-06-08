import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Doctor"
    },
    price: {
        type: String,
        required: true
    },
    amountTime: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const serviceModel = mongoose.models.Service || mongoose.model("Service", schema);

export default serviceModel;
