import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { getData, updateData } from "../../apis/fetching";
import { FiTrash } from "react-icons/fi";
import { profileUpload } from "../../utils/uploadFiles";
import userIcon from './../../assets/userIcon.png'

const CandidateRegistration = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [countries, setCountries] = useState([]);
  const { handleSubmit, register, control,formState:{errors} } = useForm();
  const term = useWatch({ control, name: "term" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);
console.log(tempProfile);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const blobImg = new Blob([file], { type: file.type });
      const blobUrl = URL.createObjectURL(blobImg);
    
    
      setTempProfile(blobUrl); 
      setSelectedFile(file);
    } else {
      console.log('No file selected');
    }
  };

  const handleUpload = async() => {
    if (selectedFile) {
    const data =  await profileUpload(selectedFile,userData?.id)
    setTempProfile(data)
    } else {
     toast.error('No file selected');
    }
  };

  const navigate = useNavigate();

  // handle All Form Data

  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
    replace: skillReplace,
  } = useFieldArray({ control, name: "skills" });

  const {
    fields: experienceFields,
    append: experienceAppend,
    remove: experienceRemove,
    replace: experienceReplace
  } = useFieldArray({ control, name: "experiences" });

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await getData(`users/${user?.id}`);
        setUserData(data?.data);
        
        if(experienceFields.length <1 ){
          experienceReplace(data?.data.experiences)
          skillReplace(data?.data.skills)
        }
        console.log(experienceFields,'exp field');
        setTempProfile(data?.data?.profilePicture);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchingData();
  }, [user]);
console.log(experienceFields);
  

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const originalData = {
        name: data.firstName + " " + data.lastName || user?.name,
        gender: data.gender|| user.gender,
        profilePicture: data.profilePicture || tempProfile,
        country: data.country ||user.country,
        address: data.address || user.address, 
        city: data.city || user.city,
        postcode: data.postcode || user.postcode,
        term: true,
        skills: data.skills || user.skills,
        bio: data.bio || user.bio,
        resume: data.resume || user.resume,
        facebook: data.facebook || user.facebook,
        linkedin: data.linkedin || user.linkedin,
        youtube: data.youtube || user.youtube,
        github: data.github || user.github,
        phone: data.phone || user.phone,
        aboutme: data.aboutme || user.aboutme,
        experiences: data.experiences || user.experiences,
      };
      const result = await updateData(`users/${user?.id}`, originalData);
      if (result.success) {
        toast.success("Profile updated successfully");
        window.location.href='/dashboard'
     
        return;
      }
      toast.error("Please Try Again");
    } catch (error) {
      toast.error(error.message || "Please Try Again");
    }
  };

  console.log(errors);
  return (
    <div className="pt-14">
      <div className="flex justify-center items-center overflow-auto p-10">
        <form
          className="bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="w-full text-2xl text-primary mb-5">
            Update Your Profile
          </h1>
          <div className="profilePicture w-full text-center mx-auto my-10">
      <img
        className="text-center mx-auto rounded-full h-32 w-32 cursor-pointer"
        src={tempProfile ? tempProfile : userIcon}
        alt=""
      />
      <div className="mt-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }} // Hide the input
          id="fileInput"
        />
        <label htmlFor="fileInput" className="btn cursor-pointer">
          Change
        </label>
        <button type="button" className="btn mt-2" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              defaultValue={userData?.name?.split(" ")[0]}
              
              {...register("firstName",{ required: "First Name is required"})}
            />
              {  errors?.firstName && <p className="text-red-400 font-bold">{errors.firstName.message}</p>}
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={userData?.name?.split(" ")[1]}
              id="lastName"
              {...register("lastName",{ required: "Last Name is required"})}
            />
                          {  errors?.lastName && <p className="text-red-400 font-bold">{errors.lastName.message}</p>}
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="bg-gray-200  cursor-pointer"
              defaultValue={user?.email}
              disabled
              id="email"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <h1 className="mb-3">Gender</h1>
            <div className="flex gap-3">
              <div>
                <input
                  type="radio"
                  id="male"
                  {...register("gender")}
                  value="male"
                  defaultChecked={user?.gender === "male"}
                />
                <label className="ml-2 text-lg" htmlFor="male">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  {...register("gender")}
                  value="female"
                  defaultChecked={user?.gender === "female"}
                  
                />
                <label className="ml-2 text-lg" htmlFor="female">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  {...register("gender")}
                  value="other"
                  defaultChecked={user?.gender === "other"}
                />
                <label className="ml-2 text-lg" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
          </div>
          <hr className="w-full mt-2 bg-black" />
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" htmlFor="country">
              Country
            </label>
            <select
              defaultValue={userData?.country}
              {...register("country",{required: 'country is required'})}
              id="country"
            >
              {countries
                .sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
                .map(({ name }) => (
                  <option key={name?.common} value={name.common}>{name.common}</option>
                ))}
            </select>
            {  errors?.country && <p className="text-red-400 font-bold">{errors.country.message}</p>}
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="address">
              Street Address
            </label>
            <input
              defaultValue={userData?.address}
              type="text"
              {...register("address")}
              id="address"
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              defaultValue={userData?.city}
              {...register("city",{required:'city is required'})}
              id="city"
            />
                                      {  errors?.city && <p className="text-red-400 font-bold">{errors.city.message}</p>}
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="postcode">
              Postal Code
            </label>
            <input
              type="text"
              defaultValue={userData?.postcode}
              {...register("postcode",{required:'postal Code is Required'})}
              id="postcode"
            />
                                      {  errors?.postcode && <p className="text-red-400 font-bold">{errors.postcode.message}</p>}
          </div>

          <div className="flex flex-col w-full ">
            <label className="mb-2" htmlFor="postcode">
              Phone
            </label>
            <input
              type="text"
              defaultValue={userData?.phone}
              {...register("phone",{required:'phone Code is Required'})}
              id="phone"
            />
                                      {  errors?.postcode && <p className="text-red-400 font-bold">{errors.postcode.message}</p>}
          </div>
          {/* About Me */}
          <div className="flex flex-col w-full">
            <label className="mb-2" htmlFor="postcode">
              About me
            </label>
            <textarea
              className="rounded-sm"
              type="text"
              defaultValue={userData?.aboutme}
              {...register("aboutme",{required:'about is Required'})}
              id="aboutme"
            />
                                      {  errors?.aboutme && <p className="text-red-400 font-bold">{errors.aboutme.message}</p>}
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="bio">
              bio
            </label>
            <input
              type="text"
              defaultValue={userData?.bio}
              {...register("bio")}
              id="bio"
              placeholder="Your Designation"
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="bio">
              Resume
            </label>
            <input
              type="text"
              defaultValue={userData?.bio}
              {...register("resume",{required:'required'})}
              id="resume"
              placeholder="Your Resume Url"
            />
                                      {  errors?.resume && <p className="text-red-400 font-bold">{errors.resume.message}</p>}
          </div>

          {/* Links */}

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="facebook">
              Facebook
            </label>
            <input
              type="text"
              defaultValue={userData?.linkedin}
              {...register("facebook")}
              id="facebook"
              placeholder="Facebook Url"
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="linkedin">
              Linkedin
            </label>
            <input
              type="text"
              defaultValue={userData?.facebook}
              {...register("linkedin",{required:'Linkedin is required'})}
              id="linkedin"
              placeholder="linkedin Url"
            />
                                      {  errors?.linkedin && <p className="text-red-400 font-bold">{errors.linkedin.message}</p>}
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="linkedin">
              Github
            </label>
            <input
              type="text"
              defaultValue={userData?.github}
              {...register("github")}
              id="github"
              placeholder="github Url"
            />
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="linkedin">
              Youtube
            </label>
            <input
              type="text"
              defaultValue={userData?.youtube}
              {...register("youtube")}
              id="youtube"
              placeholder="youtube Url"
            />
          </div>

          {/* new Code Start */}

          <div className="flex flex-col w-full">
            <label className="mb-2">Skills</label>
            <div>
              <div>
                {skillFields.map((item, index) => (
                  <div key={item.key} className="flex items-center gap-3 mb-5">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`skills[${index}]`, {
                        defaultValue: userData?.skills?.[index] || "",
                        required:'skills is Required'
                      })}
                    />
                                              {  errors?.skills && <p className="text-red-400 font-bold">{errors.skills.message}</p>}
                    <button
                      type="button"
                      onClick={() => skillRemove(index)}
                      className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 group-hover:text-white transition-all"
                        size="20"
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => skillAppend("")}
                  className="btn"
                >
                  Add Skill
                </button>
              </div>
            </div>
          </div>

          {/* experience  */}

          <div>
            {experienceFields.map((item, index) => (
              <div key={item.id} className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="text"
                    className="!w-full"
                    placeholder="Company Name"
                    {...register(`experiences[${index}].companyName`)}
                  />
                  <input
                    type="text"
                    className="!w-full"
                    placeholder="Designation"
                    {...register(`experiences[${index}].designation`)}
                  />

                  <button
                    type="button"
                    onClick={() => experienceRemove(index)}
                    className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                  >
                    <FiTrash
                      className="text-red-500 group-hover:text-white transition-all"
                      size="20"
                    />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div>
                    <label htmlFor="start_date">Start Date</label>
                    <input
                      type="date"
                      className="!w-full"
                      placeholder="Designation"
                      {...register(`experiences[${index}].start_date`)}
                    />
                  </div>

                  <div>
                    <label htmlFor="start_date">End Date</label>
                    <input
                      type="date"
                      className="!w-full"
                      placeholder="Designation"
                      {...register(`experiences[${index}].end_date`)}
                    />
                  </div>
                </div>

                <textarea
                  placeholder="About Yourself"
                  className="w-full h-20 border p-2 rounded-sm"
                  {...register(`experiences[${index}].about`)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => experienceAppend({})}
              className="btn"
            >
              Add Experience
            </button>
          </div>

          {/* New Code End */}
          <div className="flex justify-between items-center w-full mt-3">
            <div className="flex  w-full max-w-xs">
              <input
                className="mr-3"
                type="checkbox"
                {...register("term")}
                id="terms"
              />
              <label htmlFor="terms">I agree to terms and conditions</label>
            </div>
            <button disabled={!term} className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateRegistration;
