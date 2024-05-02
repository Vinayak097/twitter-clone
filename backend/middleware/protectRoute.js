import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
export const protectRouter=async(req,res,next)=>{
    console.log("proteRouter")
    try{
        console.log("if")
        const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}


    const decoded= await jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({error:"unAthorized access token invalid"})
    }
    const user=await User.findById({_id:decoded.userId}).select("-password");

    if(!user){
        return res.status(404).json({error:"user not found"})
    }
    
    req.user=user;
    next()


    }catch(err){
        console.log("Error in protectRoute middleware", err.message);
		return res.status(500).json({ error: "Internal Server Error" });

    }
}