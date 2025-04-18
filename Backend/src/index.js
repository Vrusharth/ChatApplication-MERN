// Dependencies: npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io
import express from 'express';
import authRoutes from './routes/authroute.js';
import messageRoutes from './routes/messageroute.js'
import { app,server} from './lib/socket.js'; // import socket.io server and express app

import dotenv from 'dotenv';
import connectDB from './lib/db.js'
import cookieParser from 'cookie-parser';


app.use(express.json()); // parse json data
app.use(cookieParser()); // parse cookies

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

dotenv.config(); // configure dotenv to use .env file
const PORT=process.env.PORT || 5001; // set port to 5001

server.listen(PORT,()=>{
    console.log('Server is running on port',+ PORT);
    connectDB(); // connect to MongoDB kn
})

