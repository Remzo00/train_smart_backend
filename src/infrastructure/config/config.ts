import mongoose from "mongoose";

export async function config(){
    const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ts_backend';
    try{
        await mongoose.connect(MONGO_URL)
    } catch (error){
        console.error('Error connecting to the database', error);
        throw error
    }

}
