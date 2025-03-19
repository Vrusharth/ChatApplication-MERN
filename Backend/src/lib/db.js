import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`); // print the host of the connection
        
        
    }catch(error){
        console.log("Error connecting to MongoDB",error);
    }
}
export default connectDB; // export the function to use in other files