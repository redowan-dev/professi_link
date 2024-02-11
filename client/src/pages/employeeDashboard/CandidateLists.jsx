import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getData } from "../../apis/fetching";
import { Link, useParams } from "react-router-dom";


export default function CandidateLists() {
  const {id} = useParams()
  console.log(id);
    const [jobs,setJobs] = useState([])
    const {user}= useContext(AuthContext)
  
    useEffect(() => {
      const fetchingData = async () => {
        try {
          const data = await getData(`apply?jobId=${id}`);
          setJobs(data?.data);
          
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchingData();
    }, [user]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold my-5">Candidate Lists</h2>
      {jobs?.map(( {email,_id ,user,status,jobId }) => (
            <div
            key={_id}
            className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
          >
            <div className=' text-primary'>
              <div>
                <p className='text-xl'>{jobId?.position}</p>
                <small className='text-primary/70 '>
                  status{" "}
                  <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                    {status}
                  </span>
                </small>
              </div>
              <p>email : {email}</p>
            </div>
            <div className='flex justify-between items-center mt-5'>
              <div>
                <h2 className="text-text-2xl font-bold">Experience :</h2>
                {
                 user.experiences.length !== 0 ?  user?.experiences.map((exp,i) => (
                  <div key={i}>
                                  <p>company Name: {exp.companyName}</p>
                                  <p>designation: {exp.designation}</p>
                                  </div>
                                    )) :
                                    'Fresher'
                }
                
               
                 </div>
              <Link className='btn' to={`/profile/${user?.id}`}>
                Details
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}
