import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import { getData, postData, updateData } from "../../apis/fetching";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddJob = () => {
  const [jobs, setJobs] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await getData(`jobs/${id}`);

        setJobs(data?.data);
        skillReplace(data?.data?.skills);
        reqReplace(data?.data?.requirements);
        resReplace(data?.data?.responsibilities);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (id) {
      fetchingData();
    }
  }, [id]);
  console.log(jobs);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const {
    fields: resFields,
    append: resAppend,
    remove: resRemove,
    replace: resReplace,
  } = useFieldArray({ control, name: "responsibilities" });
  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
    replace: skillReplace,
  } = useFieldArray({ control, name: "skills" });
  const {
    fields: reqFields,
    append: reqAppend,
    remove: reqRemove,
    replace: reqReplace,
  } = useFieldArray({ control, name: "requirements" });

  const onSubmit = async (data) => {
    console.log(data.companyName);

    try {
      const originalData = {
        companyName: data.companyName,
        position: data.position,
        experience: data.experience,
        workLevel: data.workLevel,
        employmentType: data.employmentType,
        salaryRange: data.salaryRange,
        location: data.location,
        overview: data.overview,
        employeeId: user?.id,
      };
      let result;
      if (!id) {
        result = await postData(`jobs`, originalData);
      } else {
        result = await updateData(`jobs/${id}`, originalData);
      }

      if (result.success) {
        toast.success("Data updated successfully");
        return;
      }
      toast.error("Please Try Again");
    } catch (error) {
      toast.error(error.message || "Please Try Again");
    }
  };

  return (
    <div className="flex justify-center items-center overflow-auto p-10">
      <form
        className="bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="w-full text-2xl text-primary mb-5">
          Add a new position
        </h1>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="position">
            Position
          </label>
          <input
            type="text"
            id="position"
            defaultValue={jobs?.position}
            {...register("position", { required: "required" })}
          />
          {errors?.position && (
            <p className="text-red-400 font-bold">{errors.position.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="companyName">
            Company Name
          </label>
          <input
            className=""
            type="text"
            defaultValue={jobs?.companyName}
            id="companyName"
            {...register("companyName", { required: "required" })}
          />
          {errors?.companyName && (
            <p className="text-red-400 font-bold">
              {errors.companyName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="experience">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            defaultValue={jobs?.experience}
            {...register("experience", { required: "required" })}
          />
          {errors?.experience && (
            <p className="text-red-400 font-bold">
              {errors.experience.message}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="workLevel">
            Work Level
          </label>
          <input
            type="text"
            id="workLevel"
            defaultValue={jobs?.workLevel}
            {...register("workLevel", { required: "required" })}
          />
          {errors?.workLevel && (
            <p className="text-red-400 font-bold">{errors.workLevel.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="employmentType">
            Employment Type
          </label>
          <input
            type="text"
            id="employmentType"
            defaultValue={jobs?.employmentType}
            {...register("employmentType", { required: "required" })}
          />
          {errors?.employmentType && (
            <p className="text-red-400 font-bold">
              {errors.employmentType.message}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="salaryRange">
            Salary Range
          </label>
          <input
            type="text"
            id="salaryRange"
            defaultValue={jobs?.salaryRange}
            {...register("salaryRange", { required: "required" })}
          />
          {errors?.salaryRange && (
            <p className="text-red-400 font-bold">
              {errors.salaryRange.message}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            defaultValue={jobs?.location}
            {...register("location", { required: "required" })}
          />
          {errors?.location && (
            <p className="text-red-400 font-bold">{errors.location.message}</p>
          )}
        </div>
        <hr className="w-full mt-2 bg-black" />
        <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="overview">
            Overview
          </label>
          <textarea
            rows={8}
            {...register("overview", { required: "required" })}
            defaultValue={jobs?.overview}
            id="overview"
          />
          {errors?.overview && (
            <p className="text-red-400 font-bold">{errors.overview.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-2">Skills</label>
          <div>
            <div>
              {skillFields.map((item, index) => {
                return (
                  <div key={item.key} className="flex items-center gap-3 mb-5">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`skills[${index}]`)}
                    />
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
                );
              })}
            </div>
            <div className="text-center">
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
        <div className="flex flex-col w-full">
          <label className="mb-2">Responsibilities</label>
          <div>
            <div>
              {resFields.map((item, index) => {
                return (
                  <div key={item.key} className=" mb-5 flex items-center gap-3">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`responsibilities[${index}]`)}
                    />
                    <button
                      type="button"
                      onClick={() => resRemove(index)}
                      className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 group-hover:text-white transition-all"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => resAppend("")}
                className="btn"
              >
                Add Responsibility
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-2">Requirements</label>
          <div>
            <div>
              {reqFields.map((item, index) => {
                return (
                  <div key={item.key} className=" mb-5 flex items-center gap-3">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`requirements[${index}]`)}
                    />
                    <button
                      type="button"
                      onClick={() => reqRemove(index)}
                      className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 group-hover:text-white transition-all"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => reqAppend("")}
                className="btn"
              >
                Add Requirement
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full mt-3">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

// Position name
// Company name
// Experience
// Work Level
// Salary Range
// Employment Type
// Location
// Overview
// Responsibilities
// Requirements
// Skills
