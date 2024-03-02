import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

connect()

export async function PUT(request) {

    try {
        const reqBody = await request.json()
        const { user } = reqBody

        const client = await User.findOne({ forgotPasswordToken: user.token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!client) {
            return NextResponse.json({ error: "Invalid link" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(user.password, salt)
        client.forgotPasswordTokenExpiry = undefined;
        client.forgotPasswordToken = undefined;
        client.password = hashedPassword;

        await client.save();

        return NextResponse.json({
            message: "Password Updated Successfully",
            success: true
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

