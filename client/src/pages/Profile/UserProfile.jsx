import React, { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import { getData } from '../../apis/fetching';

export default function UserProfile() {
  const [users,setUsers] = useState([])
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await getData(`users`);
        setUsers(data?.data);
        
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchingData();
  }, []);
  return (
    <div className='pt-14 container mx-auto px-5'>
        <h2 className='text-2xl font-bold text-center text-[#691F74]'>All Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {

users?.map(user => (
  <ProfileCard key={user?._id} user={user}/>
))

          }
       
        </div>
    </div>
  )
}
