"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile");
        } catch (error) {
            console.log("Login failed", error.message);
        }
    }

    return (
        <div className="flex justify-center items-center h-[100vh] bg-white">
            <div className="md:w-[80vw] lg:w-[30vw] flex flex-col justify-center m-10 p-8 border border-black">
                <h1 className="text-lg">Login</h1>

                <label htmlFor="email" className="my-2">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
                <label htmlFor="password" className="mb-2">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
                <button
                    onClick={onLogin}
                    className="m-2 p-2 border border-black rounded-lg mb-4 focus:outline-none focus:border-amber-400 bg-amber-400 transition duration-500">Signup</button>
                <Link href="/signup">Visit Signup page</Link>
            </div>
        </div>
    )

}