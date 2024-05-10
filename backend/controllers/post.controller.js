import e from "express";
import { User } from "../models/user.model.js";

import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js";
import { Notification } from "../models/notification.model.js";
import cookieParser from "cookie-parser";
const Router =e.Router()
export const creatPost= async (req,res)=>{
    try {
		const { text } = req.body;
		let { img } = req.body;
		const userId = req.user._id.toString();

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if (!text && !img) {
			return res.status(400).json({ error: "Post must have text or image" });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newPost = new Post({
			user: userId,
			text,
			img,
		});

		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
		console.log("Error in createPost controller: ", error);
	}
}
export  const deletePost=async(req,res)=>{
    const userId=req.user._id.toString()
    const postId=req.params.id;

    try{
        const post=await Post.findById(postId)
        console.log(post)
        if(!post){
            res.status(404).json({message:"post not found"})
        }
        if(post.user.toString()!==userId.toString()){
            res.status(400).json({message:"you are not authorized to delete this post "})
        }
        if(post.img){
            const imgId=Post.img.split('/').pop().split(".")[0]
            await cloudinary.uploader.destroy(imgId);
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({message:"post deleted"})

        
    }catch(error){
        console.log("error in creaetpost ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})
    }
}
export const commntPush=async(req,res)=>{
    const {text}=req.body
    const postId=req.params.id;
    const userId=req.user._id;
    try{
        const posts=await Post.findById(postId);
        if(!posts){
            res.status(404).json({message:"post not found"})
        }
        const comment={text,user:userId}
        posts.comments.push(comment)
        await posts.save()
        res.status(200).json(posts)

    }catch(error){
        console.log("error in commentpost ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})
    }
}

export const getPosts=async(req,res)=>{
    const userId=req.user._id;
    try{
        const posts = await Post.find()
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

   
    console.log(dlete)
        if(posts.length===0){
            return res.status(200).json([])
        }

        res.status(200).json(posts)

    }catch(error){
        console.log("error in getposts  ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})

    }

}
export const likeUnlike=async(req,res)=>{
    const postId=req.params.id;
    const userId=req.user._id;
    
    try{
        const post =await Post.findById(postId)
        const user=await User.findById(userId)
        
        console.log(user)

        if(!post){
            res.status(404).json({message:"Post not found"})
        }
        const like=post.likes.includes(userId)
        const likepost=user.likedPost.includes(postId)
        if(like && likepost){
            //unlike
            await Post.updateOne({_id:postId,$pull:{likes:userId}})
            res.status(200).json({message:"post unliked successfully"})
            await User.updateOne({id:userId,$pull:{likedPost:postId}})
            
        }else{
            const notification=new Notification({
                from:userId,
                to:post.user,
                type:"like",
                
            })
            
            await notification.save()
         await User.updateOne({id:userId,$push:{likedPost:postId}})
            await Post.updateOne({id:postId,$push:{likes:userId}})
            res.status(200).json({message:"post liked successfully"})
        }
       


    }catch(error){
        console.log("error in likeunlike post  ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})

    }
}

export const getLikesposts=async(req,res)=>{
    const id=req.params.id;
    const userId=req.user._id
    try{
        const user=await User.findById(userId)
        const posts=user.likedPost;

        res.status(200).json(posts)

    }catch(error){
        console.log("error in getposts  ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})

    }
}

export const getFollowingpost=async(req,res)=>{
    const userId=req.user._id;
    try{
        const user=await User.findById(userId)

        if(!user){res.status(404).json({message:"user not found"})}
        const following=user.following;
        const feedposts=await Post.find({user:{$in:following}})
        res.status(200).json(feedposts)

    }   catch(error) {
        console.log("error in likeunlike post  ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})
    }
}