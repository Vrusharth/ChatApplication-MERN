import cloudinary from "../lib/cloudinary.js";
import connectDB from "../lib/db.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";



export const signup= async (req,res)=>{  
    const {fullName,email,password}=req.body;// get the data from the request body this comes from the frontend 
    try {
        // check password length
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        // check if user exists
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"});
        
        // hash the password
        const salt=await bcrypt.genSalt(10); // salt is a random string that is used to hash the password
        const hashedPassword= await bcrypt.hash(password,salt); // hash the password with the salt
        
        // create a new user with the hashed password and save it to the database
        const newUser=new User({
            fullName,
            email,
            password:hashedPassword
        })
        if(newUser){
            // generate JWT token
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            });

        }else{
            return res.status(400).json({message:"Invalid User Data"});
        }
    
    
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Server Error"});
        
    }
}

export const login= async(req,res)=>{
    const {email,password}=req.body // get the data from the request body this comes from the frontend
    try {
        //check if user exist 
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Email does not exist"});
        // check if password is correct
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).jason({message:"Invalid Credentials"})
        
        generateToken(user._id,res);
        res.status(200).json({ // send the user data to the frontend
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profile
        })
        
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Server Error"});
        
    }
}

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0}); // clear the cookie
        res.status(200).json({message:"Logged Out Successfully"});
        
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Server Error"});
        
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body; // get the profilePic from the request body
        const userID=req.user._id.profilePic
        if(!profilePic){
            return res.status(400).json({message:"Please select an image"});
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic)
        const updatedUser=await User.findByIdAndUpdate(userID,{profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json({updatedUser})
    } catch (error) {
        console.log("Error in updateProfile controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }

}

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user); // send the user data to the frontend
    } catch (error) {
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }}