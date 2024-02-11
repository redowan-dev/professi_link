import { useNavigate, useParams } from "react-router-dom";
import candidate from "../../assets/candidate.svg";
import employer from "../../assets/employer.svg";
import CandidateRegistration from "./CandidateRegistration";
import { updateData } from "../../apis/fetching";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AccountCreator = () => {
  const {user} = useContext(AuthContext)
  
  const navigate = useNavigate();
  const { type } = useParams();

  if (type === "candidate") {
    return <CandidateRegistration />;
  }

  if (type === "employer") {
    return <CandidateRegistration />;
  }

  const handleEmployerRegistration = async ()=>{
    try {
      const result = await updateData(`users/${user?.id}`,{role:'recruiter'})
     
      navigate("/register/employer")
    } catch (error) {
      toast.error(error?.message || 'Something Went Wrong')
    }

    
  }
  const handleRecruiterRegistration = async ()=>{
    await updateData(`users/${user?.id}`,{role:'candidate'})
    navigate("/register/candidate")
  }

  return (
<div className="container mx-auto">
<div className='h-screen pt-14'>
      <h1 className='text-center my-10 text-2xl'>Continue as ...</h1>
      <div className='flex justify-evenly '>
        <div
          onClick={handleRecruiterRegistration}
          className='flex flex-col gap-20 justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group'
        >
          <img className='h-5/6' src={candidate} alt='' />
          <p className='text-center text-3xl'>Candidate</p>
        </div>
        <div
          onClick={handleEmployerRegistration}
          className='flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group'
        >
          <img className='h-[77%]' src={employer} alt='' />
          <p className='text-center text-3xl'>Recruiter</p>
        </div>
      </div>
    </div>
</div>
  );
};

export default AccountCreator;
