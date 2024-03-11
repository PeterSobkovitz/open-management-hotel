import React, { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from './authContext';
import axios from 'axios';

function LoginModal({ isOpen, onClose }) {
  const modalRef = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserRole } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/login", data);
      console.log(response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.roleName);
      setIsLoggedIn(true);
      setUserRole(response.data.roleName);
      onClose();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

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

  const formStyle = {
    border: '2px solid #be955b',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Added slight shadow for depth
  };

  const inputStyle = {
    borderColor: '#be955b',
    borderWidth: '2px',
    marginBottom: '16px',
    padding: '12px',
    borderRadius: '4px',
    outline: 'none', // Remove the default focus outline
    boxShadow: 'none', // Reset any default shadow or outline on focus
  };

  const buttonStyle = {
    backgroundColor: '#be955b',
    border: 'none',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // Smooth transition for background color
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-w-md" style={formStyle}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold" style={{ color: '#be955b', textAlign:"center",alignItems: 'center' }}>Welcome back</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-200">
            {/* Ideally, insert a close icon here */}
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
              className="w-full text-gray-700"
              style={inputStyle}
            />
            {errors.email && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 6 })}
              className="w-full text-gray-700"
              style={inputStyle}
            />
            {errors.password && <p className="text-red-500 text-xs italic">Password must be at least 6 characters.</p>}
          </div>
          <button type="submit" style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a0846d'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#be955b'}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
