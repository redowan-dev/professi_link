import  { Job } from "./jobs.model.js"

export const createJobService = async (data)=>{
    try {

      
        const result = Job.create(data)
        return result
    } catch (error) {
       throw new Error(error)
    }
}
export const updateJobService = async (id,data)=>{
    try {
        
        const result = Job.findByIdAndUpdate(
           id, data, { new: true }
        )
        return result
    } catch (error) {
       throw new Error(error)
    }
}

// export const getAllJObsService = async (queries)=>{
    
//     try {
//         const result = Job.find(queries)
//         return result
//     } catch (error) {
//        throw new Error(error)
//     }
// }
export const getAllJObsService = async (queries) => {
    try {
      if (queries.hasOwnProperty('search')) {
        const searchTerm = queries.search;
        const lowerCaseTerm = searchTerm.toLowerCase();
        const queryObject = {
          $or: [
            { companyName: { $regex: lowerCaseTerm, $options: 'i' } },
            { employmentType: { $regex: lowerCaseTerm, $options: 'i' } },
            { location: { $regex: lowerCaseTerm, $options: 'i' } },
            { position: { $regex: lowerCaseTerm, $options: 'i' } },
            { workLevel: { $regex: lowerCaseTerm, $options: 'i' } },
            { overview: { $regex: lowerCaseTerm, $options: 'i' } },
          ]
        };
  
        const result = await Job.find(queryObject).exec();
        return result;
      } else {
        delete queries.search;
        const result = await Job.find(queries).exec();
        return result;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
export const getjobDetailsService = async (id)=>{
    try {
        const result = Job.findById(id)
        return result
    } catch (error) {
       throw new Error(error)
    }
}