"use client";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
    const router = useRouter()
    const { error, message, user } = useSelector((state) => state.auth);

    console.log(user);
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 >Profile</h1>
            <button

                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>
            <ToastContainer/>
            <Link href="/updateUser">Edit User</Link>
        </div>
    )
}