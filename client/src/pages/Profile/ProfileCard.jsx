import React, { useEffect, useState } from 'react'
// import { IoLocationSharp,IoMdMail } from "react-icons/io5";
import { CiMail,CiLocationOn  } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router-dom';

export default function ProfileCard({user}) {
const {role,name,address,email,bio,profilePicture} = user
  
    const navigate = useNavigate()


  return (
<div>
  <div onClick={()=> navigate(`${user?.id}`)} className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden my-4">
    <img className="w-full h-56 object-cover object-center" src={profilePicture} alt="avatar" />
    <div className="flex items-center px-6 py-3 bg-gray-900">

      <h1 className="mx-3 text-white font-semibold text-lg">{role}</h1>
    </div>
    <div className="py-4 px-6">
      <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
      <p className="py-2 text-lg text-gray-700">{bio}</p>

      <div className="flex items-center mt-4 text-gray-700">
      <CiLocationOn/>
        <h1 className="px-2 text-sm">{address && address}</h1>
      </div>
      <div className="flex items-center mt-4 text-gray-700">
      <CiMail />
        <h1 className="px-2 text-sm">{email}</h1>
      </div>
    </div>
  </div>
</div>

  )
}
