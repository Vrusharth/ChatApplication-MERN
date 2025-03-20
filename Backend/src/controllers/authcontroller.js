import connectDB from "../lib/db.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";
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
        res.statue(500).json({message:"Server Error"});
        
    }
}

export const login=(req,res)=>{
    res.send("login route");
}

export const logout=(req,res)=>{
    res.send("logout route");
}