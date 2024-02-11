
import { useEffect, useState } from "react";
import JobCard from "../components/reusable/JobCard";
import { getData } from "../apis/fetching";
import SearchContainer from "./home/SearchContainer";
import Loading from "../components/reusable/Loading";

const Jobs = () => {
const [loading,setLoading] = useState(false)
  const [search,setSearch] = useState('')
  const [jobs,setJobs] = useState([])

  useEffect(()=>{
    const fetchingData = async()=>{
      try {
        setLoading(true)
        const data = await getData(`jobs?search=${search}`)
        setJobs(data?.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error.message);
      }

      }
      fetchingData()
  },[search])

  if (loading) {
    return <Loading />;
  }
  return (
    <div className='pt-14 px-5'>
    
      <div className='bg-primary/10 p-5 rounded-2xl flex justify-center items-center gap-5'>
        <h1 className='font-semibold text-2xl'>Find Jobs</h1>
        {/* <input type="text" placeholder="search here" /> */}
      </div>
      <SearchContainer setSearch={setSearch}/>
   <div className="flex justify-center">
  
   </div>
      <div className='grid md:grid-cols-2 gap-5 mt-5'>
        {
          jobs.length>0 ?  jobs?.map(jobData => (
            <JobCard
             key={jobData._id}
             jobData={jobData}
             />
          ))
          : (
            <h2 className="text-center text-2xl">Result Not Found</h2>
          )
        }
       
      </div>
    </div>
  );
};

export default Jobs;
