import mongoose from "mongoose";


const studentSchema=new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email uniqueness
    },
    religion: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    }
});

// Create a model from the schema


const Student = mongoose.model('Student', studentSchema);

export default Student