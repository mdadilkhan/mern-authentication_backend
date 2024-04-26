
import Hotel from '../models/hotel.model.js'


export const saveHotelDetails = async (req, res, next) => {
    console.log(req.boddy);
    try {
        // Extract student details from the request body
        const { fullname, address, mobileno,filename } = req.body;

        // Create a new student document
        const hotel = new Hotel({
            fullname,
            address,
            mobileno,
            filename
        });

        // Save the student document to the database
        await hotel.save();

        // Send success response
        res.status(201).json({ success: true, message: 'Hotel details saved successfully' });
    } catch (error) {
        // Handle error
        console.error(error);
        next(error);
        // res.status(500).json({ success: false, message: 'Failed to save student details', error: error.message });
    }
};



export const getAllHotel = async (req, res, next) => {
    console.log("find hotel");
    try {
        // Fetch all student documents from the database
        const hotels = await Hotel.find();

        // Send success response with the array of student documents
        res.status(200).json({ success: true, hotels: hotels });
    } catch (error) {
        // Handle error
        console.error(error);
        next(error);
        // res.status(500).json({ success: false, message: 'Failed to fetch student details', error: error.message });
    }
};

export const getHotel = async (req, res, next) => {
    console.log("getHotel");
    try {
        const hotelId = req.params.id; // Extract the room ID from the request parameters

        // Fetch the room document from the database based on the provided ID
        const hotel = await Hotel.findById(hotelId);

        // Check if the room exists
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        // Send success response with the room document
        res.status(200).json({ success: true, room: hotel });
    } catch (error) {
        // Handle error
        console.error(error);
        next(error);
        // res.status(500).json({ success: false, message: 'Failed to fetch room details', error: error.message });
    }
};