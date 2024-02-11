import { User } from "./user.model.js"

export const createUserService = async (data)=>{
    try {
        const result = User.create(data)
        return result
    } catch (error) {
       throw new Error(error)
    }
}

export const getAllUserService = async (query)=>{
    try {
        const result = User.find(query)
        return result
    } catch (error) {
       throw new Error(error)
    }
}

export const getUserByIdService = async (id)=>{
    try {
        const result = User.findOne({id:id})
        return result
    } catch (error) {
       throw new Error(error)
    }
}

export const updateUserByIdService = async (id, data) => {
    console.log(data)
    try {
      const result = await User.updateOne(
        { id: id },
        { $set: data },
        {new:true} 
      );
      console.log(result)
  
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };