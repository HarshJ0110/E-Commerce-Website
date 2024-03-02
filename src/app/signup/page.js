"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        storeName: "",
        location: {
            address: "",
            city: "",
            state: "",
            country: "",
            pinCode: ""
        },
        managerName: "",
        phoneNo: "",
        password: "",
    });

    const validateEmail = (email) => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNo) => {
        // Phone number validation regex
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNo);
    };

    const validatePassword = (password) => {
        // Password validation regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateFields = () => {
        if (!validateEmail(user.email)) {
            toast.error("Please enter a valid email address");
            return false;
        }
        if (!validatePhoneNumber(user.phoneNo)) {
            toast.error("Please enter a valid phone number");
            return false;
        }
        if (!validatePassword(user.password)) {
            toast.error("Password must contain at least one capital letter, one special character, one small letter, one number, and have a minimum length of 8 characters");
            return false;
        }
        // Add more validations for other fields if needed
        return true;
    };

    const onSignup = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }
        try {
            const response = await axios.post("/api/users/signup", user);
            router.push("/login");
            toast.success("User Created Successfully")
        } catch (error) {
            // console.log("Signup failed", error.message);
            toast.error("Signup failed")
        }
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                [name]: value
            }
        }));
    };
    return (
        <div className="w-full flex justify-center items-center h-full bg-white">
            <div className="w-[100vw] sm:w-[80vw] lg:w-[60vw] flex flex-col justify-center sm:m-10 sm:p-8 p-4 border border-gray-300 rounded-lg">
                <h1 className="m-2 font-lg text-2xl text-black-400">Signup</h1>
                {/* <form> */}
                <div className="flex sm:flex-col justify-between">
                    <div className="flex sm:flex-row flex-col justify-center">
                        <label htmlFor="email" className="mb-3 sm:m-0 sm:mx-2 sm:w-[50vw]">Email</label>
                        <label htmlFor="PhoneNo" className="mt-3 sm:m-0 sm:mx-2 sm:w-[50vw]">Phone No</label>
                    </div>
                    <div className="flex sm:flex-row flex-col justify-center">
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                            required
                        />
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="PhoneNo"
                            type="Number"
                            value={user.phoneNo}
                            onChange={(e) => setUser({ ...user, phoneNo: e.target.value })}
                            placeholder="PhoneNo"
                            required
                        />
                    </div>
                </div>

                <div className="flex sm:flex-col justify-between">
                    <div className="flex sm:flex-row flex-col justify-center">
                        <label htmlFor="storename" className="mb-3 sm:m-0 sm:mx-2 sm:w-[50vw]">Store Name</label>
                        <label htmlFor="managername" className="mt-3 sm:m-0 w-[15vw] sm:mx-2 sm:w-[50vw]">Manager Name</label>
                    </div>
                    <div className="flex sm:flex-row flex-col justify-center">
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black" id="storeName"
                            type="text"
                            value={user.storeName}
                            onChange={(e) => setUser({ ...user, storeName: e.target.value })}
                            placeholder="Store Name"
                            required
                        />
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black" id="managerName"
                            type="text"
                            value={user.managerName}
                            onChange={(e) => setUser({ ...user, managerName: e.target.value })}
                            placeholder="Manager Name"
                            required
                        />
                    </div>
                </div>

                <div className="flex sm:flex-col justify-between">
                    <div className="flex sm:flex-row flex-col justify-center">
                        <label htmlFor="address" className="mb-3 sm:m-0 sm:mx-2 sm:w-[50vw]">Address</label>
                        <label htmlFor="city" className="mt-3 sm:m-0 sm:mx-2 sm:w-[50vw]">City</label>
                    </div>

                    <div className="flex sm:flex-row flex-col justify-center">
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black" id="address"
                            name="address"
                            type="text"
                            value={user.location.address}
                            onChange={handleLocationChange}
                            placeholder="Address"
                            required
                        />
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black" id="city"
                            name="city"
                            type="text"
                            value={user.location.city}
                            onChange={handleLocationChange}
                            placeholder="City"
                            required
                        />
                    </div>
                </div>
                <div className="flex sm:flex-col justify-between">
                    <div className="flex sm:flex-row flex-col justify-center">
                        <label htmlFor="state" className="mb-3 sm:m-0 sm:mx-2 sm:w-[50vw]">State</label>
                        <label htmlFor="country" className="mt-3 sm:m-0 sm:mx-2 sm:w-[50vw]">Country</label>
                    </div>

                    <div className="flex sm:flex-row flex-col justify-center">
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black" id="state"
                            name="state"
                            type="text"
                            value={user.location.state}
                            onChange={handleLocationChange}
                            placeholder="State"
                            required
                        />
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black" id="country"
                            name="country"
                            type="text"
                            value={user.location.country}
                            onChange={handleLocationChange}
                            placeholder="Country"
                            required
                        />
                    </div>
                </div>
                <div className="flex sm:flex-col justify-between">
                    <div className="flex sm:flex-row flex-col justify-center">
                        <label htmlFor="pinCode" className="mb-3 sm:m-0 sm:mx-2 sm:w-[50vw]">Pin Code</label>
                        <label htmlFor="password" className="mt-3 sm:m-0 sm:mx-2 sm:w-[50vw]">Password</label>
                    </div>
                    <div className="flex sm:flex-row flex-col justify-center">
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black" id="pinCode"
                            name="pinCode"
                            type="number"
                            value={user.location.pinCode}
                            onChange={handleLocationChange}
                            placeholder="Pin Code"
                            required
                        />
                        <input
                            className="w-[60vw] sm:w-[50vw] sm:m-1 my-2 sm:p-2 px-2 p-1 border border-gray-300 rounded-lg sm:mb-4 focus:outline-none focus:border-gray-600 text-black" id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                            required
                        />
                    </div>
                </div>
                <button
                    onClick={onSignup}
                    className="my-1 p-2 w-full border border-black rounded-lg mb-4 text-white bg-black hover:bg-white hover:text-black transition duration-500" type="submit">Sign in
                </button>
                <ToastContainer />

                <div className="flex flex-col items-center justify-center">
                    <span className="w-full border-t border-gray-300 m-3"></span>
                    <p className="text-sm mt-2 font-medium"><span>Already have an account? </span><span><Link href="/login">Login</Link></span></p>
                </div>
            </div>

        </div>
    )
}