import { Notification } from "../models/notification.model.js"
export const getNotification=async(req,res)=>{
    console.log("enter in noficaiotns")
    const userId=req.user._id
    try{
        const notification=await Notification.find({to:userId}).populate({
            path:"from",
            select:  "username profileImg"
            
        })
        await Notification.updateMany({to:userId},{read:true})
        res.status(200).json(notification)

    }catch(error){
        console.log("error in getnoficaiton  ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})

    }

}
export const deleteNotification=async(req,res)=>{
    const userId=req.user._id;
    try{
        await Notification.deleteMany({to:userId})
        res.status(200).json({message:"notification deleted successfully"})

    }catch(error){
        console.log("error in deletenofication post  ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})
    }

}

export const deleteOneN=async(req,res)=>{
    const id=req.params.id;
    try{
        const notification =await Notification.findById(id)
        if(!notification){
            return res.status(404).json({message:"notification not found"})
        }
        if(notification.to.toString()!==userId.toString()){
            return res.status(403).json({message:"u are not athorized to delete"})
        }

        await Notification.deleteOne({_id:id})

        
        res.status(200).json(notification)
    }catch(error){
        console.log("error in dleteonenotification  ",error.message)
        res.status(500).json({error:"Internal server error"+error.message})
    }
}