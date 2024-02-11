import { Comment } from "./comment.model.js";


export const createCommentService = async (data) => {
  console.log(data);
  try {
    console.log(data);
    const result = await Comment.create(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};


export const getAllCommentByPostService = async (postId)=>{


  try {
      const result = await Comment.find({post: postId})
      .populate('user',' name email profilePicture')

      return result
  } catch (error) {
     throw new Error(error)
  }
}
