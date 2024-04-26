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
  

function generateJwtToken(payload, secretKey) {
    const token = jwt.sign(payload, secretKey);
    return token;
  }
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
 
     console.log("helo");
      res
      .cookie("access_token", token, {
        expires: expiryDate,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .send({ success: true, rest });
    } catch (error) {
      console.log('catch');
      next(error)
    }
}



export const google = async (req, res, next) => {
  try {
    console.log("inside try");
    console.log("email",req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("inside eif");
      const token = generateJwtToken({ id: user._id },process.env.JWT_SECRET)
      console.log("token inside if",token);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
          sameSite: "None",
          secure: true,
        })
        .status(200)
        .json(rest);
    } else {
      console.log("isnide else");
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
        console.log("generated password",generatedPassword);
      const hashedPassword = await hashing(generatedPassword);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });


      console.log("generated user name",newUser.username);
      await newUser.save();
      const token = generateJwtToken({ id: newUser._id },process.env.JWT_SECRET)
      console.log("inside else token",token);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log("inside catch");

    next(error);
  }
};


export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};