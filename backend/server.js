import * as fs from 'fs'
import e from 'express'
import authRoutes from "./routes/auth.route.js"
import connectDb from './db.js';
import dotenv from "dotenv";

dotenv.config()
const port=process.env.PORT || 8000;
const app=e();

app.get('/',(req,res)=>{
    res.send("hello home")
    
})
app.use("/api/v1/auth",authRoutes);
console.log(process.env.MONGO_URL,port)

app.listen(8000,()=>{
    console.log("sever is running ")
    // connectDb();
});