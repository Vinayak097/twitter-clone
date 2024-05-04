import mongoose, { mongo } from "mongoose";
import { User } from "./user.model.js";
const notificationShema= new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        require:true,
        
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        require:true

    },
    type:{
        type:String,
        required :true,
        enum:['follow','like','comment','reply']        
    },
    read:{
        type:Boolean,
        default:false
    }
    

},{timestamps:true})

export const Notification=mongoose.model("Notification",notificationShema)