import express from 'express'
import { signup } from '../controller/auth.controller.js'


const router =express.Router()


router.post('/signup',signup)
// router.post('/singin')


export default router
