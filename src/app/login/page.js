"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError, clearMessage } from "../redux/slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "../../images/backgroundImage.webp";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { error, message, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }
    }, [error, message, dispatch]);

    const [client, setClient] = useState({
        email: "",
        password: "",
    });
    { console.log(client.password) }
    const onLogin = async () => {
        try {
            await dispatch(loginUser(client));
            router.push(`/profile`);
        } catch (error) {

        }
    };
    return (
        <div
            className="flex justify-center items-center h-screen bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${Image})` }}
        >
            <div className="md:w-[80vw] lg:w-[30vw] flex flex-col justify-center m-10 p-8 border border-gray-300 rounded-lg bg-white bg-opacity-75">
                <h1 className="font-lg text-2xl text-black-400">Login</h1>
                <label htmlFor="email" className="my-2">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={client.email}
                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                    placeholder="Email"
                />
                <label htmlFor="password" className="mb-2">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={client.password}
                    onChange={(e) => setClient({ ...client, password: e.target.value })}
                    placeholder="Password"
                />
                <Link href="/forgotPassword" className="font-light">Forgot Password ?</Link>
                <button
                    onClick={onLogin}
                    className="mt-3 m-1 p-2 border border-black rounded-lg mb-4 text-white bg-black hover:bg-white hover:text-black transition duration-500">Login</button>
                <ToastContainer />
                <div className="flex flex-col items-center justify-center">
                    <span className="w-full border-t border-gray-300 m-3"></span>
                    <p className="mt-2 text-sm font-medium"><span>create an account? </span><span><Link href="/signup">Sign in</Link></span></p>
                </div>
            </div>
        </div>
    );
}
