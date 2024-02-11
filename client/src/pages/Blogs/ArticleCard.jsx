import React from 'react'
import {Link} from 'react-router-dom'

export default function ArticleCard({blog}) {

  return (
    <article className="shadow-lg py-2">
    <Link to={`${blog?._id}`}>
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
    <Link to={`${blog?._id}`}  className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
      Read  more
    </Link>
  </article>
  )
}
