import { Schema, Types, model } from "mongoose";

const blogSchema = new Schema({
    user:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },

    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
    },
    content:{
        type:{},
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Blog = model('Blog',blogSchema)