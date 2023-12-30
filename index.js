import express from 'express'
import env from 'dotenv'


env.config()
const app=express();
 

const PORT= +process.env.PORT || 6000  
console.log(PORT);   
app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
}) 