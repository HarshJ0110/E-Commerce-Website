"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


export default function resetPassword() {
  const router = useRouter();
  const [user, setUser] = useState({ token: "", password: "" });

  const handlePassword = async () => {
    try {
      const response = await axios.put("/api/users/resetPassword", { user });
      toast.success(response.data.message); // Show success message
      router.push("/login");

    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        if (error.response.status === 400 || 500) {
          // Validation error
          toast.error(error.response.data.error);
        } else {
          // Other server errors
          toast.error("Server Error. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("Network Error. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    const urlToken = decodeURIComponent(window.location.search.split("=")[1]);
    console.log(urlToken)
    setUser({ ...user, token: urlToken || "" });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="md:w-[80vw] lg:w-[30vw] flex flex-col justify-center m-10 p-8 border border-gray-300 rounded-lg">
        <h1 className="text-lg">Reset Password</h1>
        <label htmlFor="password" className="my-2">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={handlePassword}
          className="m-2 p-2 border border-black rounded-lg mb-4 text-white bg-black hover:bg-white hover:text-black transition duration-500"
        >Reset Password</button>
        <ToastContainer />
        <Link href="/login">Back to Login</Link>
      </div>
    </div>
  );
};
