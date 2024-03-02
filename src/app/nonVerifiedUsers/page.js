"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Verify() {

    const [users, setUsers] = useState([]);
    const verifySelectedUsers = async (userId) => {
        try {
            const response = await axios.put("/api/users/verifyUser", { id: userId, verify: true });
            toast.success(response.data.message); // Show success message
            const updatedUsers = users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users/getNonVerifiedUsers");
                setUsers(response.data.data);
            } catch (error) {
                console.log("Error in fetching verified users", error.message);
                toast.error(error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex justify-center h-screen w-screen bg-white">
            <div className="m-4 sm:m-6 md:m-8 lg:m-10 xl:m-12 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-x-auto">
                <button onClick={() => window.location.reload()} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Refresh
                </button>
                <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"><Link href="verifiedUsers">Verified User</Link></button>

                {users.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Store Name</th>
                                <th className="py-2 px-4">Manager Name</th>
                                <th className="py-2 px-4">Address</th>
                                <th className="py-2 px-4">City</th>
                                <th className="py-2 px-4">State</th>
                                <th className="py-2 px-4">Country</th>
                                <th className="py-2 px-4">Pin Code</th>
                                <th className="py-2 px-4">Phone No</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ToastContainer />
                            {users.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{user.storeName}</td>
                                    <td className="py-2 px-4">{user.managerName}</td>
                                    <td className="py-2 px-4">{user.location.address}</td>
                                    <td className="py-2 px-4">{user.location.city}</td>
                                    <td className="py-2 px-4">{user.location.state}</td>
                                    <td className="py-2 px-4">{user.location.country}</td>
                                    <td className="py-2 px-4">{user.location.pinCode}</td>
                                    <td className="py-2 px-4">{user.phoneNo}</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => verifySelectedUsers(user._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Verify
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-5">No users found.</p>
                )}
            </div>
        </div>
    );
}