import React, { useEffect, useState } from 'react'
import Badge from '../../components/reusable/Badge'
import { BiSearchAlt } from "react-icons/bi";
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
export default function SearchContainer({setSearch}) {
    const [searchValue, setSearchValue] = useState('');
   const  navigate= useNavigate()
const {pathname} =useLocation()

const urlParams = new URLSearchParams(window.location.search);
const search= urlParams.get('search');


useEffect(()=>{
    if(!searchValue){
        setSearchValue(search)
    }
},[])
    const handleInputChange = (event) => {
      setSearchValue(event.target.value);

    };
  
    const handleButtonClick = () => {
      setSearch(searchValue);
      if(pathname === '/'){
        navigate(`/jobs?search=${searchValue}`)
      }
    };
    const keywords = [
        "Web Developer",
        "Web Designer",
        "Writer",
        "Fullstack",
        "Senior",
        "Team Lead",
        "Administration",
        "SQA",
        "Tester",
      ];
  return (
    <div className='h-full w-full  z-10 relative'>
    <div className='flex w-full  items-center justify-center'>
      <div className='w-full flex flex-col items-center'>
    
      <div
      id='search-container'
      className='bg-white rounded-full p-3 flex w-full max-w-xl overflow-hidden mt-5 shadow-lg'
    >
      <input
        className='flex-auto text-lg p-2 border-none outline-none focus:ring-0'
        type='text'
        name='search'
        id='search'
        placeholder='Job title or Keyword'
       
        value={searchValue}
        onChange={handleInputChange}
      />
      <button
        id='search-button'
        className='p-2 rounded-full bg-primary h-14 w-14 grid place-items-center'
        onClick={handleButtonClick}
      >
        <BiSearchAlt size='23' color='white' />
      </button>
    </div>
        <div className='my-16'>
          <h2 className='badge-container'>Popular Search</h2>
          <div className='mt-3 flex flex-wrap  gap-3'>
            {keywords.map((item) => (
              <Badge key={item} className='badge'>
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
   
    </div>
  </div>
  )
}
