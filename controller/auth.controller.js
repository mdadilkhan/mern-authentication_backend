import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken';
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

function generateJwtToken(payload, secretKey) {
  const token = jwt.sign(payload, secretKey);
  return token;
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    console.log('isnide signin');
    try {
    console.log('try');

      const validUser=await User.findOne({email});
      if(!validUser)return next(errorHandler(404,'User Not Found'))
      const validPassword=await bcrypt.compare(password,validUser.password)
      if(!validPassword)return next(errorHandler(401,'Invalid Credential'))
      const token = generateJwtToken({ id: validUser._id },process.env.JWT_SECRET)
      const expiryDate = new Date(Date.now() + 3600000);
      const {password:hashedPassword,...rest}=validUser._doc
      res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200) 
      .json(rest);
    } catch (error) {
      console.log('catch');
      next(error)
    }



    
}