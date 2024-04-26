
import mongoose from 'mongoose'
import env from 'dotenv'

env.config()

const Connection= async(URL)=>{
    console.log(URL);
    console.log(typeof URL); 
   try {
      await mongoose.connect(URL)
      console.log("Database connected successfully!!");
   } catch (error) {
      console.log('Error while connecting to the database ', error);
   }
}
 

export default Connection
