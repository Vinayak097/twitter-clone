import mongoose, { mongo } from "mongoose";

const postSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:true
        
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
    ,
    img:{
        type:String,
        default:""
    },
    comments:[{
        text:{
            type:String,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    }]
})

const Post=mongoose.model('Posts',postSchema);

export default Post;