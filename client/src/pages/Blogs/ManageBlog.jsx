import React, { useContext, useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import { toast } from 'react-toastify'
import { getData } from '../../apis/fetching'
import ManageBlogCard from './ManageBlogCard'
import { AuthContext } from '../../contexts/AuthContext'

export default function ManageBlog() {
  const [random,setRandom]= useState()
const {user} = useContext(AuthContext)
    
  const [blogs,setBlogs] = useState([])
  useEffect(()=>{
    const fetchingData = async()=>{
      try {
        const data = await getData(`blog?userId=${user?._id}`)
        setBlogs(data?.data)

      } catch (error) {
        toast.error(error?.message);
      }

      }
      fetchingData()
  },[random])
 
  return (
    <div className='pt-[80px]'>
        <div className="container mx-auto">
        <div className=" bg-gray-50 ">
    <div className="px-4 mx-auto max-w-screen-xl">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 ">All Articles</h2>
      <div className="grid gap-12 sm:grid-cols-2 justify-center lg:grid-cols-4">
        {
          blogs?.map((blog) => (
<ManageBlogCard key={blog}
blog={blog}
setRandom={setRandom}/>
          ))
        }
   

      </div>
    </div>
  </div>

        </div>
    </div>
  )
}
