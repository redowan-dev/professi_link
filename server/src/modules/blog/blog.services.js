import { Blog } from "./blog.model.js";

export const createBlogService = async (data) => {
  try {
    const result = await Blog.create(data);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};


export const getAllBlogService = async (queries)=>{


  try {
      const result = await Blog.find(queries)
      
      .populate('user',' name email profilePicture')

      return result
  } catch (error) {
     throw new Error(error)
  }
}
export const getBlogDetailsService = async (id)=>{

  try {
      const result =await Blog.findById(id).populate('user','name email profilePicture')
      return result
  } catch (error) {
     throw new Error(error)
  }
}
export const updateBlogDetailsService = async (id,data)=>{

  try {
      const result =await Blog.updateOne(
        {_id:id},
        {$set:data},
        {new:true}
        )
      return result
  } catch (error) {
     throw new Error(error)
  }
}

export const deleteBlogDetailsService = async (id)=>{

  try {
      const result =await Blog.findByIdAndDelete(id)
      return result
  } catch (error) {
     throw new Error(error)
  }
}