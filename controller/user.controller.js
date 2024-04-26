import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const test=(req,res)=>{
    res.json({
        message:'hellow from user api'
    })
}


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
  
  



export const updateUser = async (req, res, next) => {
  console.log("update user",req.body);
  console.log("userID",req.user.id);
  console.log("userID",req.params.id);
    if (req.user.id !== req.params.id) {
      console.log("insde error id");
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      console.log("insde try");

      if (req.body.password) {
      console.log("insde password hashing");

        req.body.password = await hashing(req.body.password);
      }
      console.log(req.body);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      console.log("after setting");

      const { password, ...rest } = updatedUser._doc;
      console.log("data",rest);
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  
  
  // delete user
  
  
  export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can delete only your account!'));
    }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted...');
    } catch (error) {
      next(error);
    }
  
  }