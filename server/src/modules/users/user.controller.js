import { createUserService, getAllUserService, getUserByIdService, updateUserByIdService } from "./user.service.js";

export const createUserController = async(req,res,next)=>{
    try {
        const  result = await createUserService(req.body)
        return res.status(201).json({
            status:201,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const getAllUserController = async(req,res,next)=>{
    try {
        const query = req.query
        const  result = await getAllUserService(query)
        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}

export const getUserByIdController = async(req,res,next)=>{
    try {
        const id = req.params.id
        const  result = await getUserByIdService(id)
        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}

export const updateUserByIdController = async(req,res,next)=>{
    try {
        const id = req.params.id
        const  result = await updateUserByIdService(id,req.body)
        return res.status(201).json({
            status:201,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}