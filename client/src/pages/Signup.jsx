import { useContext, useEffect, useState } from "react";
import loginImage from "../assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { postData } from "../apis/fetching";
import { toast} from 'react-toastify'
const Signup = () => {
  const {setLoading,createUserWithEmail,verifyEmailWithLink} = useContext(AuthContext)
  const { handleSubmit, register, reset, control,formState: { errors } } = useForm();
  
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  // const signupWithGoogle = async()=>{
  //   try {
  //    const result = await socialSignin()
  //    const user = result?.user

  //    const currentUser = {
  //     email: user.email,
  //     id: user?.uid,
  //     isVerified: user?.emailVerified,
  //     accessToken: user?.accessToken,
  //     name: user?.displayName,
  //     profilePicture: user?.photoURL,
  //   };

  //  const createDBUser =  await postData('users', currentUser);
  
  //  if(createDBUser.success === true){
  //   toast.success("Please verify your Email")
  //   navigate('/login');
  //   reset();
  //   return
  //  }else{
  //   throw new Error("Please Try Again")
  //  }

  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // }

  const onSubmit = async (data) => {
    try {
      setLoading(true);

  
      const result = await createUserWithEmail(data);
      await verifyEmailWithLink()

     const user = result.user;

  
      setLoading(false);
  
      const currentUser = {
        email: user.email,
        id: user?.uid,
        isVerified: user?.emailVerified,
        accessToken: user?.accessToken,
        name: user?.displayName,
        profilePicture: user?.photoURL,
      };
  
     const createDBUser =  await postData('users', currentUser);
    
     if(createDBUser.success === true){
      toast.success("Please verify your Email")
      navigate('/login');
      reset();
      return
     }else{
      throw new Error("Please Try Again")
     }


    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };


  return (
    <div className='flex h-screen items-center pt-14'>
      <div className='w-full md:w-1/2 hidden md:block '>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-full md:w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  {...register("email")}
                />
              </div>

              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  {...register("password",{
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: `<p>Password must be minimum  8 chars <br/> minimum  1 uppercase <br/>  1 lowercase and min  1 special char</p>`
                    }
                  })}
                />
                 {password && errors?.password && <div className="text-red-600 mt-5 font-bold" dangerouslySetInnerHTML={{ __html: errors?.password?.message }}></div>}
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='confirm-password' className='ml-5'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  {...register("confirmPassword")}
                />
              </div>
              <div className='!mt-8 '>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>

            </div>
          </form>
          {/* <button
                  
                  className='font-bold mx-auto mt-5 text-white py-3 rounded-full bg-primary w-full  disabled:cursor-not-allowed'
                  onClick={signupWithGoogle}
                
                >
                  <div className="flex gap-4 items-center justify-center"> 
                  <span><FaGoogle/></span>
                 <span> Signin With Google</span></div>
                  
                </button> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
