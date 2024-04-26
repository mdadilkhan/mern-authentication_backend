import mongoose from "mongoose";


const hotelSchema=new mongoose.Schema({
    fullname: {
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
    filename: {
        type: String,
        required: true
    }
});

// Create a model from the schema


const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel