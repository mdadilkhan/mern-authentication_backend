
import Student from '../models/room.model.js'
export const saveStudentDetails = async (req, res, next) => {
    try {
        // Extract student details from the request body
        const { fullname, course, college, address, mobileno, email, religion, filename } = req.body;

        // Create a new student document
        const student = new Student({
            fullname,
            course,
            college,
            address,
            mobileno,
            email,
            religion,
            filename
        });

        // Save the student document to the database
        await student.save();

        // Send success response
        res.status(201).json({ success: true, message: 'Student details saved successfully' });
    } catch (error) {
        // Handle error
        console.error(error);
        next(error);
        // res.status(500).json({ success: false, message: 'Failed to save student details', error: error.message });
    }
};



export const getAllRooms = async (req, res, next) => {
    try {
        // Fetch all student documents from the database
        const students = await Student.find();

        // Send success response with the array of student documents
        res.status(200).json({ success: true, students: students });
    } catch (error) {
        // Handle error
        console.error(error);
        next(error);
        // res.status(500).json({ success: false, message: 'Failed to fetch student details', error: error.message });
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id; // Extract the room ID from the request parameters

        // Fetch the room document from the database based on the provided ID
        const room = await Student.findById(roomId);

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        // Send success response with the room document
        res.status(200).json({ success: true, room: room });
    } catch (error) {
        // Handle error
        console.error(error);
        next(error);
        // res.status(500).json({ success: false, message: 'Failed to fetch room details', error: error.message });
    }
};