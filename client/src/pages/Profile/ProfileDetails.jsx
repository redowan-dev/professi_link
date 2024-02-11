import React, { useContext, useEffect, useState } from 'react'
import { FaFacebook, FaGithub,  FaLinkedin,  FaYoutube } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import { getData } from '../../apis/fetching';
import { formatDateRange } from '../../utils/dateFormat';
import { AuthContext } from '../../contexts/AuthContext';
import userIcon from './../../assets/userIcon.png';



export default function ProfileDetails() {
  const {user}= useContext(AuthContext)
  const [userData,setUser]= useState(null)
  let userId;

const {id} = useParams()
if(!id){
  userId = user?.id
}else{
  userId = id
}
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await getData(`users/${userId}`);
        setUser(data?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchingData();
  }, [id]);

console.log(userData?.email );
    
  return (
<div className='pt-16'>
<div className="bg-gray-100">
  <div className="container mx-auto py-8">
    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
      <div className="col-span-4 sm:col-span-3">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col items-center">
            <img src={userData?.profilePicture || userIcon} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
            <h1 className="text-xl font-bold text-center">{userData?.name}</h1>
            <h1 className="text-lg font-bold text-gray-500 ">{userData?.role}</h1>
            <p className="text-gray-500 font-bold">{userData?.bio}</p>
            <p className="text-gray-500 font-bold">{userData?.phone}</p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <a href={`mailto:${userData?.email}`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
              <a href={userData?.resume} className="bg-gray-300 hover:bg-gray-400 text-primary py-2 px-4 rounded" target='_blank'>Resume</a>
            </div>
          </div>
          <hr className="my-6 border-t border-gray-300" />
          <div className="flex flex-col">
            <span className="text-primary uppercase font-bold tracking-wider mb-2">Skills</span>
            <ul>
            {userData?.skills?.map(skill=> (
                <li className="mb-2">{skill}</li>
            ))}
              
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-4 sm:col-span-9">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">About Me</h2>
          <p className="text-gray-500">{userData?.aboutme}
          </p>
          <h3 className="font-semibold text-center mt-3 -mb-2">
            Find me on
          </h3>
          <div className="flex justify-center items-center gap-6 my-6">
            {
              userData?.linkedin &&(
                <a className="text-primary hover:text-primary" aria-label="Visit TrendyMinds LinkedIn" href={userData?.linkedin} target="_blank">
                <FaLinkedin size={30}/>
                            </a>
              )
            }
          
            {
              userData?.youtube && (
                <a className="text-primary hover:text-primary" aria-label="Visit TrendyMinds YouTube" href={userData?.youtube}  target="_blank">
            <FaYoutube size={30}/>
            </a>
              )
            }
            {
              userData?.facebook && (
                <a className="text-primary hover:text-primary" aria-label="Visit TrendyMinds Facebook" href={userData?.facebook}  target="_blank">
            <FaFacebook size={30}/>
            </a>
              )
            }
         {
          userData?.github &&(
            <a className="text-primary hover:text-primary" aria-label="Visit TrendyMinds Twitter" href={userData?.github } target="_blank">
             <FaGithub  size={30}/>
            </a>
          )
         }

          </div>
          <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>

          {
            userData?.experiences?.map(({companyName,designation,start_date,end_date,about},i) => (
                <div className="mb-6" key={i}>
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-primary font-bold">{designation}</span>
                  <p>
                    <span className="text-primary mr-2">At {companyName}</span>
                    <span className="text-primary">From {formatDateRange(start_date) } to {formatDateRange(end_date)}</span>
                  </p>
                </div>
                <p className="mt-2">
{about}
                </p>
              </div>
            ))
          }


        </div>
      </div>
    </div>
  </div>
</div>

</div>
  )
}
