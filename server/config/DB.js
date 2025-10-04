import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        mongoose.connection.on("connected", () => console.log("MongoDB connected successfully"));
        //Mongoose is used to connect to db easily 
        await mongoose.connect(process.env.MONGODB_URI);
    }catch(err){
        console.log("Error while connecting to MongoDB", err);
    }
}

export default connectDB;