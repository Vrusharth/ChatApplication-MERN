import mongoose from "mongoose";

const messageSchema=mongoose.Schema({
    senderID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},
{ timestamps: true }
);

const Message =monggose.model("Message",messageSchema);

export default Message;