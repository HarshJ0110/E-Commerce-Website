"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


// Define the functional component
export default function Profile() {
    const { user } = useSelector((state) => state.auth);
    
    // State variables to store user data and updated user data
    const [client, setClient] = useState({
        _id: user,
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
        password: ""
    });

    // Function to fetch user data from the server
    const fetchUserData = async () => {
        try {
            const response = await axios.post("/api/users/getUser", { id: user });
            console.log(response.data.user);
            setClient(response.data.user); // Set user data from the response
        } catch (error) {
            console.log("Error fetching user data:", error.message);
        }
    };

    // useEffect hook to fetch user data when the component mounts
    useEffect(() => {
        fetchUserData();
    }, []);

    // Function to handle form submission for updating user data
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send updated user data to the server
            const response = await axios.put("/api/users/updateUser", client);
            toast.success(response.data.message); // Show success message
        } catch (error) {
            toast.error("Error updating user"); // Show success message
        }
    };

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("location.")) {
            const locationField = name.split(".")[1]; // Extract the nested field name
            setClient(prevState => ({
                ...prevState,
                location: {
                    ...prevState.location,
                    [locationField]: value // Update the specific nested field
                }
            }));
        } else {
            setClient(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    // Render the form to edit user data
    return (
        <div className="bg-white flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl mb-4 flex justify-center">Edit User</h1>
                <form onSubmit={onSubmit} className="w-full max-w-md">
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold m-auto ml-0">Email</label>
                        <input type="text" name="email" value={client.email} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold m-auto ml-0">Store Name</label>
                        <input type="text" name="storeName" value={client.storeName} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold m-auto ml-0">Manager Name</label>
                        <input type="text" name="managerName" value={client.managerName} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold m-auto ml-0">Phone No</label>
                        <input type="text" name="phoneNo" value={client.phoneNo} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold mb-2">Address</label>
                        <input type="text" name="location.address" value={client.location.address} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold m-auto ml-0">City</label>
                        <input type="text" name="location.city" value={client.location.city} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold m-auto ml-0">State</label>
                        <input type="text" name="location.state" value={client.location.state} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold m-auto ml-0">Country</label>
                        <input type="text" name="location.country" value={client.location.country} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="block text-gray-700 font-bold m-auto ml-0">Pin Code</label>
                        <input type="text" name="location.pinCode" value={client.location.pinCode} className="input-field p-2 border-b border-gray-500" onChange={handleChange} />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update User</button>
                    <ToastContainer/>
                </form>
        </div>
    );
}
