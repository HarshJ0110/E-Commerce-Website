"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useRouter } from "next/router";

export default function Verify() {
    // const router = useRouter();
    const [users, setUsers] = useState([]);
    const [client, setClient] = useState({id: "", verify: false});


    // const Verify = async () => {
    //     console.log(client,"client23")
    //     const user = await axios.put("/api/users/verifyUser", client);
    //     console.log(user,"user23");    
    // }
    
    //new test
    const Verify = async () => {
        try {
            console.log(client, "client23")
            const response = await axios.put("/api/users/verifyUser", client);
            console.log(response.data, "user23");
            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show an error message to the user
            // harsh this side
        }
    }
     

    const onRefresh = async () => {
        try {
            
            const response = await axios.get("/api/users/getUsers");
            console.log(response.data.data)
            setUsers(response.data.data);
 
        } catch (error) {
            console.log("Signup failed", error.message);
        }
    }

    return (
        <div className="flex justify-center items-center h-[screen] bg-white">
            <div className="md:w-[80vw] lg:w-[60vw] h-[screen] flex flex-col justify-center m-10 p-8 border border-black">
            {/* {console.log(users)} */}
                 {users.map((user, index) => ( 
                    <div className="w-[30vw]" key={index}>
                        {console.log(user._id)}
                        {/* {console.log(index)}
                        {console.log(user.email)}
                        {console.log(user.storeName)}
                        {console.log(user.managerName)} */}
                        <p className="flex justify-between"><span>Email:</span><span>{user.email}</span></p>
                        {/* <input value type="checkbox" /> */}
                        <p className="flex justify-between"><span>Store Name: </span><span>{user.storeName}</span></p>
                        <p className="flex justify-between"><span>Manager Name: </span><span>{user.managerName}</span></p>
                        <p className="flex justify-between"> <span>Address: </span><span>{user.location.address}</span></p>
                        <p className="flex justify-between"><span>City: </span><span>{user.location.city}</span></p>
                        <p className="flex justify-between"><span>State: </span><span>{user.location.state}</span></p>
                        <p className="flex justify-between"><span>Country: </span><span>{user.location.country}</span></p>
                        <p className="flex justify-between"><span>Pin Code: </span><span>{user.location.pinCode}</span></p>
                        <p className="flex justify-between mb-4"><span>Phone No: </span><span>{user.phoneNo}</span></p>
                        {/* <button  id="myCheckbox" onClick={(() => (setUser({id: user._id, verify: true})),Verify)} >Verify</button>                     */}
                        <input type="checkbox" value={"Verify"} className='text-green' onClick={() => setClient({id: user._id, verify: true})} />   
                        <button onClick={Verify}>Verify</button>              
                    
                    </div>
                ))} 
                <button
                    onClick={onRefresh}
                    className="my-1 p-2 border border-black rounded-lg mb-4 focus:outline-none focus:border-amber-400 bg-amber-400 transition duration-500"
                    type="button"
                >   
                    Refresh
                </button>
            </div>
        </div>
    );
}
