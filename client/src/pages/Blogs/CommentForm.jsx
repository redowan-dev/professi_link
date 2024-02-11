import React, { useContext } from "react";
import { postData } from "../../apis/fetching";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function CommentForm({ postId, setIsUpdated }) {
    const {user} = useContext(AuthContext)
console.log(user);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
        console.log(user);
      const originalData = {
        user: user?._id,
        comment: data?.comment,
        post: postId,
      };
      await postData(`comment`, originalData);
      setIsUpdated(Math.random());
      toast.success("comment added Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {user?.email ? (
        <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2 px-4 mb-4 bg-white rounded-sm border border-gray-200">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-lg border-1 border-gray-800 rounded-md"
              placeholder="Write a comment..."
              required
              {...register("comment")}
            />
          </div>
          <button type="submit" className="btn">
            Post comment
          </button>
        </form>
      ) : (
        <Link to="/login" type="submit" className="btn">
          Post comment
        </Link>
      )}
    </>
  );
}
