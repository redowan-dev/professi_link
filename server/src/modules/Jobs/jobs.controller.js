import { createJobService, getAllJObsService, getjobDetailsService ,updateJobService} from "./jobs.service.js";

export const createJobController = async(req,res,next)=>{
    try {
        const  result = await createJobService(req.body)
        return res.status(201).json({
            status:201,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const updateJobController = async(req,res,next)=>{
    const {id} = req.params
    try {
        const  result = await updateJobService(id,req.body)
        return res.status(201).json({
            status:201,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}

export const getAllJobsController = async(req,res,next)=>{
    try {
        const queries = req.query
        const  result = await getAllJObsService(queries)
        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const getJobDetailsController = async(req,res,next)=>{
    try {
        const {id} = req.params
        const  result = await getjobDetailsService(id)
        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}