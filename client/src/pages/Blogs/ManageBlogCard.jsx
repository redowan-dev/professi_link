import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import {Link} from 'react-router-dom'
import BlogModal from './BlogModal'
import { deleteData } from '../../apis/fetching';
import { toast } from 'react-toastify';

export default function ManageBlogCard({blog,setRandom}) {
    const [showModal, setShowModal] = useState(false);
   const handleDelete = async(id)=>{
   try {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (confirmDelete) {
     const deletedData = await deleteData(`blog/${id}`)
     toast.success('successfully deleted')
     setRandom(Math.random())
    }
   } catch (error) {
    toast.error(error.message)
   }
   }
  return (
    <article className="shadow-lg py-2">
    <Link to={`/blogs${blog?._id}`}>
      <img src={blog?.thumbnail} className="mb-5 rounded-lg w-full h-auto" alt="Image 1" />
    </Link>
    <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900">
      <Link to={`${blog?._id}`}>{blog?.title}</Link>
    </h2>
    <p className="mb-4 text-gray-500 dark:text-gray-400">
  {blog?.description && blog.description.length >  100
    ? `${blog.description.slice(0,  100)}...`
    : blog?.description || ''}
</p>
<div className="flex items-center justify-between">
<Link  to={`/blogs/${blog?._id}`}  className="inline-flex btn items-center font-medium text-primary-600 dark:text-primary-500 hover:no-underline">
      Read  more
    </Link>
    <button className='btn'onClick={()=>handleDelete(blog?._id)}><MdDelete/></button>
    <button className='btn' onClick={()=>setShowModal(state=> !state)}><MdEdit/></button>
</div>
<BlogModal showModal={showModal} setShowModal={setShowModal} data={blog}/>
  </article>
  )
}
