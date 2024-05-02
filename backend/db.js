import mongoose from "mongoose"
const connectDb=async()=>{
    try{
    const conn=await mongoose.connect(process.env.MONGO_URL|"") ;
    console.log(`MongoDb connected : ${conn.connection.host}`)
    }catch(e){
        console.log(`error in connection to mongoDB ${e.message}` )
        process.exit(1);
    }
}
export default connectDb;
