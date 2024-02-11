import { Schema, Types, model } from 'mongoose'
const jobSchema = new Schema({
    employeeId:{
    type:String,
    ref:'User',
    required:true,
},
    companyName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    workLevel: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true
    },
    salaryRange: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    responsibilities: {
        type: [String],
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    requirements: {
        type: [String],
        required: true
    }
});

export const Job = model('Job', jobSchema);


