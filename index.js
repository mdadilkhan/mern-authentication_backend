import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import  Connection  from './db/db.js';
import userRoute from './route/user.route.js'
import authRoute from './route/auth.route.js'


env.config()
const app=express();
 

app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());


app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });



const PORT= +process.env.PORT || 6000  
Connection(process.env.DATABASE)
app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
}) 