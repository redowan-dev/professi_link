import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
    user:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    post:{
        type:Types.ObjectId,
        ref:'Blog',
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },


},{timestamps:true})

export const Comment = model('Comment',commentSchema)