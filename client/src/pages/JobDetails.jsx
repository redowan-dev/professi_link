import { useContext, useEffect, useState } from "react";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { getData, postData } from "../apis/fetching";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
const JobDetails = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applyCond, setApplyCond] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await getData(`jobs/${id}`);
        const isApplied = await getData(`apply?jobId=${data?.data?._id}`);

        setJobs(data?.data);

        if (isApplied?.data) {
          const isEmailInData = isApplied.data
            .map((item) => item.email)
            .includes(user?.email);

          setApplyCond(isEmailInData);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchingData();
  }, [id]);

  const handleApply = async () => {
    if(!user?.email){
      toast.warning("You Must Logged In First")
      navigate('/login')
      return
    }
    try {
      const originalData = {
        user: user?._id,
        email: user?.email,
        jobId: jobs?._id,
      };
      await postData(`apply`, originalData);
      toast.success("Applied Successfully");
      setApplyCond(true)
      navigate('/jobs')
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="pt-14 grid grid-cols-12 gap-5 px-5">
        <div className="col-span-12 md:col-span-9 mb-10">
          <div className="h-80 rounded-xl overflow-hidden">
            <img className="h-full w-full object-cover" src={meeting} alt="" />
          </div>
          <div className="space-y-5">
            <div className="flex justify-between items-center mt-5">
              <h1 className="text-xl font-semibold text-primary">
                {jobs?.position}
              </h1>
              {
 user?.role !== 'recruiter' && (
    applyCond ? (
      <button onClick={handleApply} disabled className="btn font-bold disabled:bg-gray-300 disabled:text-primary">
        Already Applied
      </button>
    ) : (
      <button onClick={handleApply} className="btn">
        {loading ? "Please Wait" : "Apply"}
      </button>
    )
 )
}


            </div>
            <div>
              <h1 className="text-primary text-lg font-medium mb-3">
                Overview
              </h1>
              <p>{jobs?.overview}</p>
            </div>
            <div>
              <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
              <ul>
                {jobs?.skills?.map((skill) => (
                  <li className="flex items-center">
                    <BsArrowRightShort /> <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="text-primary text-lg font-medium mb-3">
                Requirements
              </h1>
              <ul>
                {jobs?.requirements?.map((skill) => (
                  <li className="flex items-center">
                    <BsArrowRightShort /> <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="text-primary text-lg font-medium mb-3">
                Responsibilities
              </h1>
              <ul>
                {jobs?.responsibilities?.map((skill) => (
                  <li className="flex items-center">
                    <BsArrowRightShort /> <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <div>
              <h1 className="text-xl font-semibold text-primary mb-5">
                General Q&A
              </h1>
              <div className="text-primary my-2">
                {jobs?.queries?.map(({ question, email, reply, id }) => (
                  <div>
                    <small>{email}</small>
                    <p className="text-lg font-medium">{question}</p>
                    {reply?.map((item) => (
                      <p className="flex items-center gap-2 relative left-5">
                        <BsArrowReturnRight /> {item}
                      </p>
                    ))}

                    <div className="flex gap-3 my-5">
                      <input
                        placeholder="Reply"
                        type="text"
                        className="w-full"
                      />
                      <button
                        className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                        type="button"
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 my-5">
                <input
                  placeholder="Ask a question..."
                  type="text"
                  className="w-full"
                />
                <button
                  className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                  type="button"
                >
                  <BsArrowRightShort size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
            <div>
              <p>Experience</p>
              <h1 className="font-semibold text-lg">{jobs?.experience}</h1>
            </div>
            <div>
              <p>Work Level</p>
              <h1 className="font-semibold text-lg">{jobs?.workLevel}</h1>
            </div>
            <div>
              <p>Employment Type</p>
              <h1 className="font-semibold text-lg">{jobs?.employmentType}</h1>
            </div>
            <div>
              <p>Salary Range</p>
              <h1 className="font-semibold text-lg">{jobs?.salaryRange}</h1>
            </div>
            <div>
              <p>Location</p>
              <h1 className="font-semibold text-lg">{jobs?.location}</h1>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
            <div>
              <h1 className="font-semibold text-lg">{jobs?.companyName}</h1>
            </div>
            <div>
              <p>Company Size</p>
              <h1 className="font-semibold text-lg">Above 100</h1>
            </div>
            <div>
              <p>Founded</p>
              <h1 className="font-semibold text-lg">2001</h1>
            </div>
            <div>
              <p>Email</p>
              <h1 className="font-semibold text-lg">company.email@name.com</h1>
            </div>
            <div>
              <p>Company Location</p>
              <h1 className="font-semibold text-lg">Los Angeles</h1>
            </div>
            <div>
              <p>Website</p>
              <a className="font-semibold text-lg" href="#">
                https://website.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
