import User from "../models/usermodel.js";
import Message from "../models/messagemodel.js";
// getting the users for the sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedUserID = req.user._id;
        const filteredUsers=await User.find({ _id: { $ne: loggedUserID } }).select("-password"); 
        // $ne is for not equal to
        res.this.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar", error.message);
        res.status(500).json({ message: "Server Error" });
    }
}

// Letting the users chat with each other
export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId} =req.params
        const myId=req.user._id
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},//here we are trying to get the messages between the sender and receiver
                {myId:userToChatId,receiverId:myId} // And here we are trying to get the messages between the receiver and sender
            ]
        })
        res.status(200).json(messages)  //returning the messages
    } catch (error) {
        console.error("Error in getMessages", error.message);
        res.status(500).json({ message: "Server Error" });
        
    }
}

// sending the message
export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body
        const{id:receiverId}=req.params
        const{senderId}=req.user._id
        let imageUrl;
        if(image){
            //if image is present then we will upload the image to cloudinary
            const uploadedResponse=await cloudinary.uploader.upload(image,{upload_preset:"chat_app"})
            imageUrl=uploadedResponse.secure_url            
        }
        // creating a new message
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,//image from cloudinary
        })

        await newMessage.save() // save the new message to the database
        res.status(201).json(newMessage) // send the new message to the client
        //todo: realtime functionality will be added here using socket.io
    } catch (error) {
        console.error("Error in sendMessage", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}