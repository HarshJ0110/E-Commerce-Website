"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

    })

    const onSignup = async (e) => {
        e.preventDefault()
        try {
            
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
 
        } catch (error) {
            console.log("Signup failed", error.message);
        }
    }
    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            location: {
                ...prevState.location,
                [name]: value
            }
        }));
    };


    return (
        <div className="flex justify-center items-center h-[100vh] bg-white">
            <div className="md:w-[80vw] lg:w-[60vw] flex flex-col justify-center m-10 p-8 border border-black">
                <h1 className="m-2 font-lg text-lg text-amber-400">Signup</h1>
                <form>
<div className="w-full">
                    <div className="flex justify-center">
                        <label htmlFor="email" className="mx-2 w-[50vw]">Email</label>
                        <label htmlFor="PhoneNo" className="mx-2 w-[50vw]">Phone No</label>
                    </div>
                    <div className="flex justify-center">
                        <input
                            className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                            required
                        />
                        <input
                            className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="PhoneNo"
                            type="text"
                            value={user.phoneNo}
                            onChange={(e) => setUser({ ...user, phoneNo: e.target.value })}
                            placeholder="PhoneNo"
                            required
                        />
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex justify-center">
                        <label htmlFor="storename" className="mx-2 w-[50vw]">Store Name</label>
                        <label htmlFor="managername" className="mx-2 w-[50vw]">Manager Name</label>
                    </div>

                    <div className="flex justify-center">
                        <input
                            className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="storeName"
                            type="text"
                            value={user.storeName}
                            onChange={(e) => setUser({ ...user, storeName: e.target.value })}
                            placeholder="Store Name"
                            required
                        />

                        <input
                            className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="managerName"
                            type="text"
                            value={user.managerName}
                            onChange={(e) => setUser({ ...user, managerName: e.target.value })}
                            placeholder="Manager Name"
                            required
                        />
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex justify-center">
                        <label htmlFor="address" className="mx-2 w-[50vw]">Address</label>
                        <label htmlFor="city" className="mx-2 w-[50vw]">City</label>
                    </div>

                    <div className="flex justify-center">
                        <input
                            className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="address"
                            name="address"
                            type="text"
                            value={user.location.address}
                            onChange={handleLocationChange}
                            placeholder="Address"
                            required
                        />
                        <input
                            className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="city"
                            name="city"
                            type="text"
                            value={user.location.city}
                            onChange={handleLocationChange}
                            placeholder="City"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex justify-center">
                            <label htmlFor="state" className="mx-2 w-[50vw]">State</label>
                            <label htmlFor="country" className="mx-2 w-[50vw]">Country</label>
                        </div>

                        <div className="flex justify-center">
                            <input
                                className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                id="state"
                                name="state"
                                type="text"
                                value={user.location.state}
                                onChange={handleLocationChange}
                                placeholder="State"
                                required
                            />
                            <input
                                className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                id="country"
                                name="country"
                                type="text"
                                value={user.location.country}
                                onChange={handleLocationChange}
                                placeholder="Country"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex justify-center">
                        <label htmlFor="pinCode" className="mx-2 w-[50vw]">Pin Code</label>
                        <label htmlFor="password" className="mx-2 w-[50vw]">Password</label>
                    </div>

                    <div className="flex justify-center">
                        <input
                            className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="pinCode"
                            name="pinCode"
                            type="number"
                            value={user.location.pinCode}
                            onChange={handleLocationChange}
                            placeholder="Pin Code"
                            required
                        />
                        <input
                            className="w-[50vw] m-1 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="password"
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
                    className="my-1 p-2 w-full border border-black rounded-lg mb-4 focus:outline-none focus:border-amber-400 bg-amber-400 transition duration-500" type="submit">Signup</button>
                <Link href="/login">Visit login page</Link>
                </form>
            </div>
            
        </div>
    )
}