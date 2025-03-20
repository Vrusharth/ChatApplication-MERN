// Dependencies: npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io
import express from 'express';
import authRoutes from './routes/authroute.js';
import dotenv from 'dotenv';
import connectDB from './lib/db.js'

const app = express(); // create express app
app.use(express.json()); // parse json data

app.use("/api/auth",authRoutes);
dotenv.config(); // configure dotenv to use .env file
const PORT=process.env.PORT || 5001; // set port to 5001

app.listen(PORT,()=>{
    console.log('Server is running on port',+ PORT);
    connectDB(); // connect to MongoDB kn
})

