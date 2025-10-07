import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle.jsx';
import { assets } from '../assets/assets.js';
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from '../store/authSlice/index.js';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      const data = await dispatch(loginUser(formData));

      if (data?.payload?.status === 200) {
        alert("Login Success");
        navigate("/");
      } else {
        // console.log(data);
        
        alert(data?.payload?.message || "Login Failed");
      }
    } else {
      const data = await dispatch(signupUser(formData));

      if (data?.payload?.status === 201) {
        alert("Signup Success");
        navigate("/");
      } else {
        alert(data?.payload?.message || "Signup Failed");
        // console.log(data);
        
      }
    }
  } catch (error) {
    console.error("Error in handleSubmit:", error);
    alert("Something went wrong! Check console for details.");
  }
};



  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('/backgroundImage.png')] p-4">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      {/* Decorative blur circles */}
      <BlurCircle top="10%" left="10%" />
      <BlurCircle bottom="10%" right="10%" />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-black/40 border border-gray-700 rounded-2xl shadow-lg backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center">
          <img src={assets.logo} alt="Logo" className="w-36 h-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-gray-400">
            {isLogin ? 'Sign in to continue your movie journey' : 'Get started with us today!'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required={!isLogin}
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 text-white bg-gray-800/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-800/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" a className="text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-800/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 font-semibold text-white bg-primary rounded-md hover:bg-primary-dull transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary active:scale-95"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <p className="text-sm text-center text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', email: '', password: '' });
            }}
            className="font-medium text-primary hover:underline cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;




