import mongoose from 'mongoose'

export const connectDB=async()=>{
    try{
        const MONGO_URL=process.env.MONGO_URL;
        if(MONGO_URL){
            const conn=await mongoose.connect(MONGO_URL);
            console.log(`Connected to MongoDb ${conn.connection.host}`);
        }
        else{
            console.error("MongoDB URL is not defined.")
        }

    }
    catch(error){
        console.log(`Error in MongoDb is ${error}`)
    }
}
