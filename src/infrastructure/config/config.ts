import mongoose from "mongoose";

export async function config(){
    const MONGO_URL = 'mongodb+srv://remzogusinac:Zakljucano!001@atlascluster.wijc69a.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'

    try{
        return mongoose.connect(MONGO_URL)
    } catch (error){
        console.error('Error connecting to the database', error);
        throw error
    }

}
