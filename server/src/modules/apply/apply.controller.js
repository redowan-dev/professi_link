import { createApplyService, getAllApplysService, getApplyDetailsService } from "./apply.services.js";


export const createApplyController = async(req,res,next)=>{
    try {
        const  result = await createApplyService(req.body)
        return res.status(201).json({
            status:201,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}

export const getAllApplysController = async(req,res,next)=>{

    try {
  
      
        const  result = await getAllApplysService(req.query)

        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const getApplyDetailsController = async(req,res,next)=>{
    try {
        const {id} = req.params
        const  result = await getApplyDetailsService(id)
        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}