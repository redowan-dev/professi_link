import React from 'react'
import moment from 'moment'

export default function CommentBox({comment}) {
    const {createdAt,user:{name,profilePicture}} = comment
  return (
    <article className="p-6 mt-5 mb-6 text-base border border-gray-800 bg-white rounded-lg">
    <footer className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <p className="inline-flex items-center mr-3 font-semibold text-sm   ">
          <img
            className="mr-2 w-6 h-6 rounded-full"
            src={profilePicture}
            alt={name}
          />
          {name}
        </p>
        <p className="text-sm text-gray-600">
          <time
            pubdate
            dateTime="2022-02-08"
            title="February 8th, 2022"
          >
          {moment(createdAt).format('MMM. D, YYYY, h:mmA')}
          </time>
        </p>
      </div>


    </footer>
    <p>
    {comment?.comment}
    </p>

  </article>
  )
}
