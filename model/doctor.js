import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },    
    expertise: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const doctorModel = mongoose.models.Doctor || mongoose.model("Doctor", schema);

export default doctorModel;
