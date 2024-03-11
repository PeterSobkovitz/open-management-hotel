
import React from 'react';
import { useForm } from 'react-hook-form';
import { MailIcon, LockClosedIcon,UserIcon } from '@heroicons/react/outline';
import axios from "axios";

const formContainerStyle = "max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md";
const inputFieldStyle = "appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";
const submitButtonStyle = "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

function Register() {
    const { register, handleSubmit,watch, formState:{errors} } = useForm();
    const password=watch("password","");
    const onSubmit = async(data) => {
        // Handle registration logic here
        try{
            const response=await axios.post("http://localhost:3001/register",data);
            console.log("send registration");
        }
        catch(e){
            console.log(e);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
            <form onSubmit={handleSubmit(onSubmit)} className={formContainerStyle}>
                <div>
                    <UserIcon className='h-5 w-5 text-gray-500 mr-2'/>
                    <input
                        name="name"
                        type="name"
                        placeholder='name'
                        {...register('name',{required:true,minLength:6})}
                        className={inputFieldStyle}
                    />
                    {errors.name&& <p className='text-red-500 text-xs italic'>Please enter your username</p>}

                </div>
                <div>
                    <MailIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <input
  name="email"
  type="email"
  placeholder="Email"
  {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
  className={inputFieldStyle}
/>
                    {errors.email && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
                </div>
                <div>
                    <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        
                        {...register('password',{ required: true, minLength: 6 })}
                        className={inputFieldStyle}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">Password must be at least 6 characters.</p>}
                </div>
                <div>
                    <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirmpassword',{ required: true, validate: (value) => value ===password || "Passwords don't match." })}
                        className={inputFieldStyle}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
                </div>
                <button type="submit" className={submitButtonStyle}>Register</button>
            </form>
        </div>
    );
}

export default Register;
