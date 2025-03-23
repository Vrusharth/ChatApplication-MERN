import express from "express"; // import express
import { login, logout, signup } from "../controllers/authcontroller.js"; // import signup, login, logout from authcontroller

const router = express.Router(); // create express router
// put the arrow funtion in controller for better code management
router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.put("/updateprofile",updateProfile)


export default router; // export router