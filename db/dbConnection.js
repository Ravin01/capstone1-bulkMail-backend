import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

// DB 
const local = 'mongodb://localhost:27017/capstone01-bulkMail'

const dbUsername = process.env.DB_USERNAME || ''
const dbPassword = process.env.DB_PASSWORD || ''
const cluster = process.env.DB_CLUSTER || ''
const dbName = process.env.DB_NAME || ''

const dbCloud = `mongodb+srv://${dbUsername}:${dbPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`
// Connect to DB
export const connectToDb = async()=>{
    try{
        const connect = await mongoose.connect(local)
        if(connect){
            console.log('DB connected successfully')
        }else{
            console.log('DB not found')
        }
    }catch(err){
        console.error(err)
        process.exit(1)
    }
} 