import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

connect()

export async function PUT(request){
    try {
        const reqBody = await request.json();
        const { id, verify } = reqBody;
        // console.log(id, verify);

        // Assuming you have properly defined your User model
        const user = await User.findByIdAndUpdate(id, { isVerified: verify }, { new: true });

        // console.log(user);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // At this point, user is successfully updated with isVerified value
        return new Response(JSON.stringify({
            message: `${user.managerName} is marked as verifired`,
            success: true,
            user: user
        }), { status: 200 });

    } catch (error) {
        // console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
