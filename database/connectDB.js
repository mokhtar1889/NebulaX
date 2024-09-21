import mongoose from "mongoose";


export function connectDB (){
    mongoose.connect(process.env.DATA_BASE).then(()=>{
        console.log("database connected ......")
        }  
    )
} 