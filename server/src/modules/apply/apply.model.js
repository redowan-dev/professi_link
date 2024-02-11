import { Schema, Types, model } from "mongoose";

const applySchema = new Schema({
    user:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    jobId:{
        type:Types.ObjectId,
        ref:'Job',
        required:true

    },
    email:{
        type:String,
        required:true,
        
    },
    status:{
        type:String,
        enum:['pending','Rejected','Accepted'],
        default:'pending'
    }
})

export const Apply = model('Apply',applySchema)