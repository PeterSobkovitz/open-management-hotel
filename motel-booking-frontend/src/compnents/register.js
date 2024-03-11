// Register.js
import React  from 'react';
import { useForm } from 'react-hook-form';
import SimpleNavbar from './simplenavbar';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Register() {
  const { register, handleSubmit,watch, formState:{errors} } = useForm();
  const password=watch("password","");
  const navigate = useNavigate();
  const onSubmit = async(data)=>{
    try{
        console.log("resp");

        const response=await axios.post("http://localhost:3001/register",data)
        navigate('/');
    }
    catch(e){
        console.log(e);
    }
  }
  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderColor: '#be955b',
    borderWidth: '1px',
    borderRadius: '4px',
    marginBottom: '16px', // Adjusted based on form layout
  };
  
  const buttonStyle = {
    backgroundColor: '#be955b',
    color: 'white',
    width:'100%',
    padding: '10px 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };
  return (
    <>
    <SimpleNavbar/>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"style={{ backgroundColor: 'white', border: '1.5px solid #be955b', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8"style={{ color: '#be955b' }}>Join</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form Fields */}
          <div className="mb-4">
          <input
                        name="name"
                        type="name"
                        placeholder='name'
                        {...register('name',{required:true,minLength:6})}
                        style={{ ...inputStyle, marginBottom: '16px' }}

                    />
                    {errors.name&& <p className='text-red-500 text-xs italic'>Please enter your username</p>}
            
          </div>
          <div className="mb-4">
          <input
  name="email"
  type="email"
  placeholder="Email"
  {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
  style={{ ...inputStyle, marginBottom: '16px' }}
/>
                    {errors.email && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
           
          </div>
          <div className="mb-6">
          <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        
                        {...register('password',{ required: true, minLength: 6 })}
                        style={{ ...inputStyle, marginBottom: '16px' }}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">Password must be at least 6 characters.</p>}
          
          </div>
          <div className="mb-6">
           <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirmpassword',{ required: true, validate: (value) => value ===password || "Passwords don't match." })}
                        style={inputStyle}
                      />
                    {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type="submit" style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a0846d'}
                     onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#be955b'}  
                     onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
                     onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                     onClick={() => setTimeout(() => {document.activeElement.style.transform = 'translateY(0)';}, 150)}>Register</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Register;
