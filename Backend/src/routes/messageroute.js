import express from 'express';
import { protectRoute } from '../middleware/authMiddleWare.js';
import { getUsersForSidebar,getMessages,sendMessage } from '../controllers/messageController.js';
import { get } from 'mongoose';

const router = express.Router();
// Below are the endpoints for the messages
router.get("/user",protectRoute,getUsersForSidebar); // get users for sidebar
router.get("/:id",protectRoute,getMessages)
// get messages
router.post("/send",protectRoute,sendMessage); // send message to user
export default router; // export router