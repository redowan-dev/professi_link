import  { useContext } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { getData } from "../apis/fetching";
import { FaGoogle } from "react-icons/fa";
const Login = () => {
  const {loginWithEmail,setLoading,setUser,socialSignin}= useContext(AuthContext)
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const signupWithGoogle = async()=>{
    try {
    socialSignin()
    .then(result=> {
      const user = result?.user
      localStorage.setItem('access_token',JSON.stringify(user.accessToken))
      if(user.emailVerified=== false){
        toast.warn('Please Verify Your Email')
      }
      const fetchingData = async()=>{
        try {
          const data = await getData(`users/${user?.uid}`)
          setUser({
            role:data?.data?.role,
            email:data?.data?.email,
            token:data?.data?.accessToken,
            id:data?.data?.id,
            isVerified:data?.data?.isVerified,
            _id:data?.data?._id
          })
         if(!data?.data?.role){
          navigate('/register')
          return
         }
         navigate('/dashboard')
        } catch (error) {
          toast.error(error.message);
        }

        }

        fetchingData()

      setLoading(false)
  
      reset()
    })
  


    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmit = (data) => {
    setLoading(true)
    loginWithEmail(data)
    .then(result=> {
      const user = result?.user
      localStorage.setItem('access_token',JSON.stringify(user.accessToken))
      if(user.emailVerified=== false){
        toast.warn('Please Verify Your Email')
      }
      const fetchingData = async()=>{
        try {
          const data = await getData(`users/${user?.uid}`)
          setUser({
            role:data?.data?.role,
            email:data?.data?.email,
            token:data?.data?.accessToken,
            id:data?.data?.id,
            isVerified:data?.data?.isVerified,
            _id:data?.data?._id
          })
         if(!data?.data?.role){
          navigate('/register')
          return
         }
         navigate('/dashboard')
        } catch (error) {
          toast.error(error.message);
        }

        }

        fetchingData()

      setLoading(false)
  
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
          <h1 className='mb-10 font-medium text-2xl'>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input type='email' {...register("email")} id='email' />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              <div className='relative !mt-8'>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full'
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                 Forget Password?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/reset-password")}
                  >
                    Reset Password
                  </span>
                </p>
                <p>
                  Don't have an account?{" "}
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
  {/**        <button onClick={signupWithGoogle}
                  
                  className='font-bold mx-auto mt-5 text-white py-3 rounded-full bg-primary w-full  disabled:cursor-not-allowed'
                
                >
                  <div className="flex gap-4 items-center justify-center"> 
                  <span><FaGoogle/></span>
                 <span> Containue With Google</span></div>
                  
                </button>
                 */}
        </div>
      </div>
    </div>
  );
};

export default Login;
