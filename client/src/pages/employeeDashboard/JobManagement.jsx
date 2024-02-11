import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getData } from "../../apis/fetching";
import JobCard from "../../components/reusable/JobCard";
import { useNavigate } from "react-router-dom";


const JobManagement = () => {
  const [jobs,setJobs] = useState([])
  const {user}= useContext(AuthContext)
const navigate = useNavigate()
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await getData(`jobs?employeeId=${user?.id}`);
        setJobs(data?.data);
        
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchingData();
  }, [user]);
  console.log();

  return (
    <div className="ml-10">
      <h1 className='text-xl py-5 '>Applied jobs</h1>
      <div className='grid grid-cols-1  pb-5'>
        {jobs?.map(( { _id, position, companyName, location, employmentType }) => (
            <div
            key={_id}
            className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
          >
            <div className='flex justify-between  text-primary'>
              <div>
                <p className='text-xl'>{position}</p>
                <small className='text-primary/70 '>
                  by{" "}
                  <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                    {companyName}
                  </span>
                </small>
              </div>
              <p>{location}</p>
            </div>
            <div className='flex justify-between items-center mt-5'>
              <p>{employmentType}</p>
              <div>
              <button className='btn mx-2' onClick={() => navigate(`/dashboard/add_job/${_id}`)}>
                Edit
              </button>
              <button className='btn' onClick={() => navigate(`${_id}`)}>
                Details
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobManagement;
