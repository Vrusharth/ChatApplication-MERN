import jwt from 'jsonwebtoken';
import User from '../models/usermodel';

export const protectRoute= async (req,res,next)=>{
    try {
        const token=req.cookies.jwt; // get the token from the cookie
        if(!token) return res.status(401).json({message:"Unauthorized-No token provided"});
    } catch (error) {
        
    }
}
