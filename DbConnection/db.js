import mongoose, { mongo } from "mongoose";

const mongooseCon=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_uri);
        console.log("DB connected")
    }
    catch(err){
        console.log("connection error"+err)
    }
}
export default mongooseCon;