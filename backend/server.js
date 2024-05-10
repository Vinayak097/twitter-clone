import * as fs from 'fs'
import e from 'express'
import authRoutes from "./routes/auth.route.js"
import connectDb from './db.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import { v2 as cloudinary } from "cloudinary";
import postRouter from "./routes/post.route.js"

console.log("started")
dotenv.config()
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})
const port=process.env.PORT || 8000;
const app=e();
app.use(cookieParser())
app.use(e.json())
app.use(e.urlencoded({extended:true})) //to parse from url encoded
app.get('/',(req,res)=>{
    res.send("hello home")
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);
console.log(process.env.MONGO_URL,port);

app.listen(8000,()=>{
    console.log("sever is running "+port)
    connectDb();
});