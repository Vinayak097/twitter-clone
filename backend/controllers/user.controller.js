import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";
import bcrypt from 'bcrypt'

export const getUserprofile=async(req,res)=>{
    try{
        const {username}=req.params;
       
        const profile =await User.findOne({username}).select("-password")
        if(!profile){
            console.log("profile not found")
            return res.status(404).json("profile not found")
        }
        return res.status(200).json({
            profile
        })    
    }catch(e){
        console.log("errro in userprofile get +",e.message)
        return res.status(500).json(" Internal server error ")
    }
}
export const followUnfollowUser= async(req,res)=>{
    try{
        const {id}=req.params;
        const currentuser=await User.findById(req.user._id)  
        if(id==req.user._id.toString()){
           return res.status(400).json({error:"You cant follow/unfollow userself"})
        }
        const isfollowing=currentuser.following.includes(id);
        console.log("enter if folow")
        if(isfollowing){
            //unfollow
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            
            res.status(200).json({message:"unfolows "+req.user._id})
            
        
            
        }else{
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
            const notify=new Notification({
                from: req.user._id,
                to: id,
                type: 'follow',
            })
            notify.save();
            res.status(200).json({message:"follows "+req.user._id})
            //follow
        }
    }catch(e){
        console.log("errro in foolow unfollow get +",e.message)
        return res.status(500).json(" Internal server error ")
    }
}

export const getSuggestedUser=async(req,res)=>{
    try{
    const userId=req.user._id;

    const userFollowedByme=await User.findById(userId).select("following");

    const users=await User.aggregate([
        {
            $match:{
                _id:{$ne:userId}
            }
        },
        {
            $sample:{size:10}
        }
        
    ])

    const filteredUsers=users.filter(user=>!userFollowedByme.following.includes(user._id))
    const suggesteduser=filteredUsers.slice(0,4)
   suggesteduser.forEach(user=>user.password = null)
    res.status(200).json({suggesteduser})
}catch(e){
    conso.log("error in getsuugested user "+e.message)
    return res.status(500).json(" Internal server error ")
}


}

export const userUpdate=async(req,res)=>{
    const {username,fullName,email,currentPassword,newPassword,bio,link}=req.body;
    let {profileImg,coverImg}=req.body;

    const userId=req.user._id;
    
    try{
        let user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if((!newPassword && currentPassword)||(!currentPassword && newPassword)){
            return res.status(400).json({message:"please provide both current password and new password"})
        }
        if(currentPassword && newPassword){
            const isMatch=await bcrypt.compare(currentPassword,newPassword)
            if(!isMatch) return res.status(400).json({error : "Current password is incorrect "});

            if(newPassword.length<6){
                return res.status(400).json({message:"password must be at least 6 characters long"})
            }
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=bcrypt.hash(newPassword,salt)
            user.password=hashedPassword;
            

        }
        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
            }
            const uploadResponse=await cloudinary.uploader.upload(profileImg);
            profileImg=uploadResponse.secure_url;
            
        }
        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0])
            }
            const uploadResponse=await cloudinary.uploader.upload(profileImg);
            profileImg=uploadResponse.secure_url;
        }
        // if(username){
            
        // }
        user.fullName=fullName||user.fullName;
        user.email=email||user.email;
        user.bio=bio||user.bio;
        user.link=link||user.link;
        user.profileImg=profileImg||user.profileImg;
        user.coverImg=coverImg||user.profileImg

        user=await user.save()
        user.password=null
        return res.status(200).json({
            user
        })


    }catch(e){
        console.log("error in update",e.message)

        return res.status(500).json("Internal server error ")
    }
}