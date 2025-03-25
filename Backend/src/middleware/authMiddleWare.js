import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';  // Use relative path



export const protectRoute= async (req,res,next)=>{
    try {
        const token=req.cookies.jwt; // get the token from the cookie
        if(!token) return res.status(401).json({message:"Unauthorized-No token provided"});

        const decoded=jwt.verify(token,process.env.JWT_SECRET); // verify the token from the cookie using the secret key

        if(!decoded){
            return res.status(401).json({message:"Unauthorized-Invalid Token"});
        }

        const user =await User.findById(decoded.userID).select("-password") // get the user from the database using the decoded id from the token
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user=user; // set the user in the request object
        next(); // call the next middleware

    } catch (error) {
        console.log("Error in protectRoute middleware",error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}
