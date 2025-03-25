import {v2 as cloudinary} from 'cloudinary';
import { config } from 'dotenv';

config(); // configure dotenv to use .env file

clloudinary.config({
    cloud_name: process.env.dit6cdclp,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
    })

    export default cloudinary;
