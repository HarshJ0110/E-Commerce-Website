import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

connect()

// export async function PUT(request){
//     try {
//         const reqBody = await request.json()
//         const {id, verify} = reqBody
//         console.log(id, verify);

//         const user = await User.findByIdAndUpdate(id, {isVerified: verify})
//         // const user = await User.findById(id)

//         console.log(user);
//         if(!user){
//             return NextResponse.json({error: "Error in fething data"}, {status: 400})
//         }


       
//         // send verification email

//         // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

//         return NextResponse.json({
//             message: "User Verified successfully",
//             success: true,
//             savedUser
//         })
        
    
//     } catch (error) {
//         return NextResponse.json({error: error.message}, {status: 500})

//     }
// }

// export async function PUT(request){
//     try {
//         const reqBody = await request.json()
//         const { id, verify } = reqBody
//         console.log(id, verify, "line46");

//         const user = await User.findByIdAndUpdate(id, { isVerified: verify })
//         // const user = await User.findById(id)

//         console.log(user);
//         if (!user) {
//             return new Response(JSON.stringify({ error: "Error in fetching data" }), { status: 400 })
//         }

//         // send verification email
//         // Assuming sendEmail and savedUser are properly defined

//         // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

//         return new Response(JSON.stringify({
//             message: "User Verified successfully",
//             success: true,
//             savedUser: user // assuming you want to return the updated user
//         }), { status: 200 })
//     } catch (error) {
//         return new Response(JSON.stringify({ error: error.message }), { status: 500 })
//     }
// }

export async function PUT(request){
    try {
        const reqBody = await request.json();
        const { id, verify } = reqBody;
        console.log(id, verify);

        // Assuming you have properly defined your User model
        const user = await User.findByIdAndUpdate(id, { isVerified: verify }, { new: true });

        console.log(user);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // At this point, user is successfully updated with isVerified value
        return new Response(JSON.stringify({
            message: "User Verified successfully",
            success: true,
            user: user
        }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
