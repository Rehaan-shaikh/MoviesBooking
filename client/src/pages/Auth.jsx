import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "../components/BlurCircle.jsx";
import { assets } from "../assets/assets.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, signupUser } from "../store/authSlice/index.js";
import { useForm } from "react-hook-form";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ React Hook Form setup (no validation rules)
  const {
    register,  //register = connect input → react-hook-form
    // It makes the input “controlled” by the form library without needing useState for each field.
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  // ✅ Handle form submission
  const onSubmit = async (data) => {
    try {
      let res;
      if (isLogin) {
        res = await dispatch(loginUser(data));
      } else {
        res = await dispatch(signupUser(data));
      }

      console.log(res);

      // ✅ Success
      if (res?.payload?.success) {
        toast.success(res.payload.message);
        if(!isLogin)
        setIsLogin(true); 
        else
          navigate("/")
      }
      // ❌ Backend error (Zod or other)
      else {
        // If backend sends field-wise errors
        if (res?.payload?.errors) {
          Object.keys(res.payload.errors).forEach((field) => {   //Object.keys(res.payload.errors) → ["name", "email", "password"]
            setError(field, { message: res.payload.errors[field] });
          });

          //setError holds data like this 
          // errors = {
          //   name: { message: "Name must be at least Two characters" },
          //   email: { message: "Invalid email format" },
          //   password: { message: "Password must be at least 6 characters" }
          // }
        } else {
          // Fallback global error
          setError("global", {
            message: res?.payload?.message || "Something went wrong",
          });
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("global", { message: "Server error. Try again later." });
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
          <img
            src={assets.logo}
            alt="Logo"
            className="w-36 h-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-gray-400">
            {isLogin
              ? "Sign in to continue your movie journey"
              : "Get started with us today!"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Rehan Shaikh"
                className="w-full px-3 py-2 mt-1 text-white bg-gray-800/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 mt-1 text-white bg-gray-800/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 mt-1 text-white bg-gray-800/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Global error (e.g., invalid credentials) */}
          {errors.global && (
            <p className="text-red-500 text-center text-sm mt-2">
              {errors.global.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-2 font-semibold text-white bg-primary rounded-md hover:bg-primary-dull transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary active:scale-95"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <p className="text-sm text-center text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              reset(); // ✅ resets all form fields and errors
            }}
            className="font-medium text-primary hover:underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
