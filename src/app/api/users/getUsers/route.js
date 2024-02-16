// import {connect} from "@/dbConfig/dbConfig";
// import User from "@/models/userModels";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// connect()

// export async function GET(request){
//     try {

//         //check if user exists
//         const users = await User.findAll();
//         if(!users){
//             return NextResponse.json({error: "No User Found"}, {status: 400})
//         }
        
//         console.log(users);
//         return NextResponse.json({
//             mesaaage: "User found",
//             data: users
//         })

//     } catch (error) {
//         return NextResponse.json({error: error.message}, {status: 500})
//     }
// }


import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request) {
    try {
        // Check if user exists
        const users = await User.find();
        if (!users || users.length === 0) {
            return NextResponse.json({ error: "No User Found" }, { status: 400 });
        }

        // console.log(users);
        return NextResponse.json({
            message: "Users found",
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
