import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
export const signup=async(req,res)=>{
    

    try{
        const  {username,email,password,fullName}   =req.body;
        console.log(req.body)
        const emailRegex=/^[^\@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid eamil format"})
        }
        const user=await User.findOne({username})
        if(user){
            res.status(400)
            return res.json("user alerady exist go to login ")
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        console.log("hashed")
        const newuser=new User({
            fullName,
            username,
            email,
            password:hashedPassword

        })
        console.log("user created")
       
        if(newuser){
            console.log(" enter if ")
            generateTokenAndSetCookie(newuser._id,res);
            console.log("passsesd")
            newuser.save();
           
            res.status(200)
        return res.json({_id:newuser._id,
        fullName:newuser.fullName,
    username:newuser.username,
        email:newuser.email,
        followers:newuser.followers,
        following:newuser.following,
        profileImg:newuser.profileImg,
        coverImg:newuser.coverImg,
        bio:newuser.boi,
                link:newuser.link
    })
            
        }else{
            return res.status(500).json({error:"invalid data"})
        }
        
        
       

    }catch(e){
        res.status(500)
        return res.json({
            msg:"error in signup : "+e.message
        })

    }
    

}
export const login=async(req,res)=>{
    try{
    const {username,password}=req.body;

    const newuser=await User.findOne({username})
    const hashedPassword=await bcrypt.compare(password,newuser.password)
    if(!newuser||!hashedPassword){
        return res.status(411).json({error:"incorrect username/pass"})
    }
    
    generateTokenAndSetCookie(newuser._id, res);
    console.log(hashedPassword)
   
        res.status(200).json({_id:newuser._id,
            fullName:newuser.fullName,
        username:newuser.username,
            email:newuser.email,
            followers:newuser.followers,
            following:newuser.following,
            profileImg:newuser.profileImg,
            coverImg:newuser.coverImg,
            bio:newuser.boi,
                    link:newuser.link
        })
   
    


}catch(e){
    res.status(500)
        return res.json({
            msg:"error in login : "+e.message
        })
}
    


}

export const logout=async(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully "})
        

    }catch(e){
        res.status(500).json({error:"Internal server error "+e.message})
    }
   


}

export const getMe=async(req,res)=>{
    try{
        console.log("enterd geme")
        const userId=req.user._id;
        const user=await User.findById(req.user._id).select("-password");

    return res.status(200).json(user);
    }catch(e){
        return res.status(500).json({error:"in getme Internal server error "+e.message})
    }
    
}

