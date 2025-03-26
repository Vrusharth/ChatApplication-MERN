import express from 'express';
import { protectRoute } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.get("/user",protectRoute,getUsers)

export default router; // export router