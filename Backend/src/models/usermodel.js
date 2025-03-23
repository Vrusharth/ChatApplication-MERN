import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true,minlength:6},
        profilePic:{type:String,default:""},
        DOB:{type:Date, required:false},
    },
    {timestamps:true}
);

// create a model from the schema
const User=mongoose.model("User",userSchema);
// export the model to use in other files
export default User; // export the model to use in other files