import express from 'express'
import { test, updateUser,deleteUser } from '../controller/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
import {saveStudentDetails,getAllRooms,getRoom} from '../controller/room.controller.js'
import {saveHotelDetails,getAllHotel,getHotel} from '../controller/hotel.controller.js'

const router=express.Router()


router.get('/home',test)
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/addRooms',verifyToken,saveStudentDetails)
router.get('/getAllRooms',verifyToken,getAllRooms)
router.get('/getRoom/:id',verifyToken,getRoom)
router.post('/addHotel',verifyToken,saveHotelDetails)
router.get('/getAllHotel',verifyToken,getAllHotel)
router.get('/getHotel/:id',verifyToken,getHotel)


export default router

