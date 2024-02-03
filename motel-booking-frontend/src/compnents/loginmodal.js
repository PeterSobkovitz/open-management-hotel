import React, { useState, useRef, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from './authContext';
import axios from 'axios';
function LoginModal({ isOpen, onClose }) {
  const modalRef = useRef();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      
      const response = await axios.post("http://localhost:3001/login", data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role',response.data.user.roles)
      setIsLoggedIn(true);
     
      onClose();
      navigate('/');

    }
    catch (e) {
      console.log(e);
    }
  }
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();


      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div ref={modalRef}>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Sign In</h2>
            <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-200">
              {/* Close icon */}
            </button>
          </div>
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
            {/* <input type="email" placeholder="Email" className="w-full p-2 mb-4 border border-gray-300 rounded"/> */}
            <div className="mb-6">
              <input
                name="password"
                type="password"
                placeholder="Password"

                {...register('password', { required: true, minLength: 6 })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.password && <p className="text-red-500 text-xs italic">Password must be at least 6 characters.</p>}

            </div>
            {/* <input type="password" placeholder="Password" className="w-full p-2 mb-4 border border-gray-300 rounded"/> */}
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;