import jwt from 'jsonwebtoken';

export const generateToken = (userID,res) => {
    const token=jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: "3d"});

    res.cookie("jwt",token,{
        httpOnly:true,// prevent XSS attacks cross site scripting attacks
        maxAge: 3*24*60*60*1000, // expires in 3 days
        SameSite:"strict", // cookie is sent only to the same site
        secure: process.env.NODE_ENV !== "development"  // cookie is sent only in https in production

    })
    return token;
}
// in this code above we are generating a token using jwt.sign() method and passing the userID and JWT_SECRET from the .env file
// we are setting the token in a cookie and sending it to the client with the response of the request 