import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import {useForm, useFormState} from 'react-hook-form'
import {toast} from 'sonner';

const usernamePattern = /^[a-zA-Z0-9._]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignupPage = () => {
  const {register, handleSubmit, reset, formState:{errors}} = useForm();
  const navigate  = useNavigate();
  const [error,setError] = useState<any>(null);
  const [isEye,setIsEye] = useState(false);

  async function onSubmit(data:any){
 console.log(data);


  const response =  await fetch('api/v1/user/signup',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
 
if(!response.ok){
  const errorData = await response.json();
  console.log(errorData);
  setError(errorData.error);
  toast.error("Failed to create user");
 
}else{
  toast.success("User is created successfully");
  setError(null);
  reset();
  navigate('/login');
}


 }

  return (
    <div className="font-[sans-serif] bg-slate-600 md:h-screen">
    <div className="grid md:grid-cols-2 items-center gap-8 h-full">
      <div className="max-md:order-1 p-4  ">
        <img src="/sign-up-user.svg" className="lg:max-w-[85%]  w-full h-full object-contain block mx-auto" alt="login-image" />
      </div>

      <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
        <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-yellow-400">Create an account</h3>
          </div>

          <div>
            <label className="text-white text-xs block mb-2">Username</label>
            <div className="relative flex items-center">
              <input type="text" 
              {...register("username", {
                required:true, 
                minLength:4,
                 maxLength:20, 
                 pattern: usernamePattern,
                 })} 
              className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter name" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
              </svg>
            </div>
            
            {errors?.username?.type === "required" && <p className='text-[#bf1650] text-[0.83em] mt-2 font-mono  -tracking-widest'> ⚠ This field is required</p>}

            {errors?.username?.type == "minLength"  && <p className='text-[#bf1650] text-[0.83em] mt-2 font-mono  -tracking-widest'> ⚠ Username must be at least 4 characters</p>}

            {errors?.username?.type == "pattern"  && <p className='text-[#bf1650] text-[0.83em] mt-2 font-mono  -tracking-widest'> ⚠ Username can only contain letters, numbers, dots, and underscores</p>}
            
          </div>
          <div className="mt-8">
            <label className="text-white text-xs block mb-2">Email</label>
            <div className="relative flex items-center">
              <input  type="text" {
                ...register("email",
                {required:true, 
                  pattern:emailPattern
                 })} 
                 className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter email" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                </g>
              </svg>
            </div>
            {errors?.email?.type === "required" && <p className='text-[#bf1650] text-[0.83em] mt-2 font-mono  -tracking-widest'> ⚠ This field is required</p>}

            {errors?.email?.type === "pattern" && <p className='text-[#bf1650] text-[0.83em] mt-2 font-mono  -tracking-widest'> ⚠ Invalid email format</p>}
            
            {error?.statusCode === 409 && <p className='text-[#bf1650] text-[0.83em] mt-2 font-mono  -tracking-widest'> ⚠ {error?.explanation}</p>}
          </div>
          <div className="mt-8">
            <label className="text-white text-xs block mb-2">Password</label>
            <div className="relative flex items-center">
              <input  type={`${isEye ? "text" :"password"}`} {
                ...register("password",
                {
                  required:true ,
                  minLength:5 ,
                  pattern:passwordPattern

                })}  
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter password" />
            <button type="button" onClick={()=>setIsEye(!isEye)}>
              <img src={`${isEye ? '/password-eye.svg':'/password-eye-close.svg'}`} className='w-4'/>
             </button>
            </div>
            {errors?.password?.type === "required" && <p className='text-[#bf1650] text-[0.83em] mt-2 font-mono  -tracking-widest'> ⚠ This field is required</p>}
            
            {errors?.password?.type == "minLength"  && <p className='text-[#bf1650] text-[0.83em] mt-2 font-mono  -tracking-widest'> ⚠ password must be at least 5 characters</p>}

            {errors?.password?.type === "pattern" && <p className='text-[#bf1650] text-[0.83em]  mt-2 font-mono  -tracking-widest'> ⚠ Password must include uppercase, lowercase, number, and special character</p>}
          </div>

        
          <div className="mt-12">
            <button type="submit" className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none">
              Register
            </button>
          
            <p className="text-sm text-white mt-8">Already have an account? <Link to="/login" className="text-yellow-400 font-semibold hover:underline ml-1">Login here</Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default SignupPage
