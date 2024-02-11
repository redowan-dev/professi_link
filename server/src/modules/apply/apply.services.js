import { User } from "../users/user.model.js";
import { Apply } from "./apply.model.js";

export const createApplyService = async (data)=>{
    try {
        const isExist = await Apply.findById(data.user)
       if(isExist?.email!==data.email){

           const result = await Apply.create(data)
           return result
       }
      throw new Error('Already Applied')
        
    } catch (error) {
       throw new Error(error)
    }
}

export const getAllApplysService = async (query)=>{
    console.log(query);

    try {
        const result = Apply.find(query).populate('user').populate('jobId')

        return result
    } catch (error) {
       throw new Error(error)
    }
}
export const getApplyDetailsService = async (id)=>{

    try {
        const result = Apply.findById(id)
        return result
    } catch (error) {
       throw new Error(error)
    }
}