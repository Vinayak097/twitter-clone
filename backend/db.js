import mongoose from "mongoose"

const connectDb=async()=>{
    try{
    const conn=await mongoose.connect("mongodb+srv://vinay20:rootvi@cluster0.paauwgs.mongodb.net/twitter-app") ;
    console.log(`MongoDb connected : ${conn.connection.host}`)
    }catch(e){
        console.log(`error in connection to mongoDB ${e.message}` )
        process.exit(1);
    }
}
export default connectDb;
