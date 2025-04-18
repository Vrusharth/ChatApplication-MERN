import express from "express"; // import express
import { login, logout, signup,updateProfile,checkAuth } from "../controllers/authcontroller.js"; // import signup, login, logout from authcontroller
import { protectRoute } from "../middleware/authMiddleWare.js";

const router = express.Router(); // create express router
// put the arrow funtion in controller for better code management
router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.put("/updateprofile", protectRoute,updateProfile) // if authenticated only then update profile

router.get("/check",protectRoute,checkAuth) // check if user is authenticated


export default router; // export router