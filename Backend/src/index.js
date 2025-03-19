// Dependencies: npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io
const express = require('express');
const authRoutes = require('./routes/authroute.js');

const app = express(); // create express app

app.use("/api/auth",authRoutes);

app.listen(5001,()=>{
    console.log('Server is running on port 5001');
})