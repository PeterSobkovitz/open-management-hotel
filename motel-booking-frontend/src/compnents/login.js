// Register.js
import React  from 'react';
import { useForm } from 'react-hook-form';
import SimpleNavbar from './simplenavbar';
import axios from "axios";
import { AuthContext } from './authContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const { register, handleSubmit,watch, formState:{errors} } = useForm();
  const { setIsLoggedIn,setUserRole} = useContext(AuthContext);
  const navigate=useNavigate();
  const onSubmit = async (data) => {
    try {
      
      
      const response = await axios.post("http://localhost:3001/login", data);
    
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role',response.data.rolename)
      setIsLoggedIn(true);
      setUserRole(response.data.rolename)
     
      navigate('/');

    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <>
    <SimpleNavbar/>
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Join</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          
          <div className="mb-4">
          <input
  name="email"
  type="email"
  placeholder="Email"
  {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
  className="w-full p-3 border border-gray-300 rounded"
/>
                    {errors.email && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
           
          </div>
          <div className="mb-6">
          <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        
                        {...register('password',{ required: true, minLength: 6 })}
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">Password must be at least 6 characters.</p>}
          
          </div>
         
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Register</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
