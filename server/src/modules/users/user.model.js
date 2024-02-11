import { model, Schema } from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
       
    },
    postcode:{
      type: String,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter'],
    },
    roleInCompany: {
        type: String,
      
    },
    companyName: {
        type: String,
      
    },
    profilePicture: {
        type: String,
       
    },
    isVerified: {
        type: Boolean,
      
    },
      gender: {
        type: String,
        enum: ['male', 'female'],
    
      },
      country: {
        type: String,
        
      },
      address: {
        type: String,
      
      },
      city: {
        type: String,




       
      },
      postalCode: {
        type: String,
        
      },
      bio:{
        type: String,
      },
      skills:{
        type: Array,
      },
      resume:{
        type: String,
      },
      phone:{
        type: Number,
        
      },
      aboutme:{
        type: String,
      },
      facebook:{
        type: String,
      },
      github:{
        type: String,
      },
      youtube:{
        type: String,
      },
      linkedin:{
        type: String,
      },
      experiences:{
        type:Array
      },
      terms: {
        type: Boolean,
       
      },
      userStatus:{
        type:Boolean,
        default: true
      },
    accessToken:String

},{timestamps: true})

export const User = model('User', userSchema);
