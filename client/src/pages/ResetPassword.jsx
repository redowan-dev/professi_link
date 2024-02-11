/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import  { useContext } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const {setLoading,resetPass}= useContext(AuthContext)
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true)
    if(!data.email){
        setLoading(false)
        toast.error('please enter your email')
        return
    }
    resetPass(data.email)
    .then(result=> {
      setLoading(false)
        toast.success('Please Check your email')
        navigate('/login')
  
      reset()
    })
    .catch(err => { 
      setLoading(false)
     alert(err.message)

      })
   
  };

  return (
    <div className='flex h-screen items-center'>
      <div className='w-full md:w-1/2 hidden md:block '>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-full md:w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Reset Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input type='email' {...register("email")} id='email' />
              </div>

              <div className='relative !mt-8'>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full'
                >
                  Reset Password
                </button>
              </div>
              <div>
                <p>
                  No need Reset?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/login")}
                  >
                  Login
                  </span>
                </p>
                <p>
                  Don't have an account?
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
