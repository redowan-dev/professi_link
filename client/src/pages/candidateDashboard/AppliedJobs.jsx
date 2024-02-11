import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getData } from "../../apis/fetching";
import JobCard from "../../components/reusable/JobCard";


const AppliedJobs = () => {
  const [jobs,setJobs] = useState([])
  const {user}= useContext(AuthContext)

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await getData(`apply?email=${user.email}`);
        setJobs(data?.data);
        
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchingData();
  }, [user]);

  return (
    <div className="ml-10">
      <h1 className='text-xl py-5 '>Applied jobs</h1>
      <div className='grid grid-cols-1 gap-5 pb-5'>
        {jobs?.map((job) => (
          <JobCard jobData={job?.jobId} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
