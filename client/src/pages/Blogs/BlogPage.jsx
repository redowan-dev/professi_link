import React, { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import { toast } from 'react-toastify'
import { getData } from '../../apis/fetching'

export default function BlogPage() {
  const [blogs,setBlogs] = useState([])
  useEffect(()=>{
    const fetchingData = async()=>{
      try {
        const data = await getData(`blog`)
        setBlogs(data?.data)

      } catch (error) {
        toast.error(error?.message);
      }

      }
      fetchingData()
  },[])
 
  return (
    <div className='pt-[80px]'>
        <div className="container mx-auto">
        <div className=" bg-gray-50 ">
    <div className="px-4 mx-auto max-w-screen-xl">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 ">All Articles</h2>
      <div className="grid gap-12 sm:grid-cols-2 justify-center lg:grid-cols-4">
        {
          blogs?.map((blog) => (
<ArticleCard key={blog}
blog={blog}/>
          ))
        }
   

      </div>
    </div>
  </div>

        </div>
    </div>
  )
}
