import express from 'express';
import { protectRoute } from '../middleware/authMiddleWare';

const router = express.Router();

router.get("/user",protectRoute,getUsers)

export default router; // export router