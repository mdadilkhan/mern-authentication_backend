import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js';


const hashing = async (plaintextPassword) => {
    try {
      const hash = await bcrypt.hash(plaintextPassword, 10);
      console.log('Hashed Password:', hash);
      return hash;
    } catch (error) {
      console.error(error);
      throw error; // You might want to handle the error differently based on your application needs
    }
  };
  
export const signup=async(req,res,next)=>{
    console.log(req.body);
     const {email,password,username}=req.body;

     const hashedPassword=await hashing(password)
     console.log(">>>>",hashedPassword);

     const newUser = new User({ username, email, password: hashedPassword });

     try {
       await newUser.save() 
       res.status(201).json({message:"user successfully added"})
        
     } catch (error) {
        next(error)
     }

} 


export const signin=(req,res,next)=>{
  
}