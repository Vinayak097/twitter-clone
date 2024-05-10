import mongoose from "mongoose";
import zod, { object } from 'zod'
import connectDb from "../db.js";

connectDb();
const usero= zod.object({
    fullName:{
        type:String,
        require:true

    },
    username:{
        type:String,
        require:true,
        minLength:6,
    },
    password:{
        type:String,
        require:true,
        minLength:6,
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    followers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
        },
    following:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
    },
    profileImg:{
        type:String,
        default:""
    },
    coverImg:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    link:{
        type:String,
        default:""
    }

})
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true

    },
    username:{
        type:String,
        require:true,
      
        unique:true
    },
    password:{
        type:String,
        require:true,
        minLength:6,
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }],
    profileImg:{
        type:String,
        default:""
    },
    coverImg:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    link:{
        type:String,
        default:""
    },
    likedPost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        default:[]
    }]
} ,{timestamps:true})

export const  User=mongoose.model("User",userSchema);
