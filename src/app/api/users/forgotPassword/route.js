import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';


connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        // console.log(reqBody);

        // Check if user exists
        const user = await User.findOne({ email });
        // console.log(user._id.toString());
        
        if (!user) {
            return NextResponse.json({ error: "Check your credential" }, { status: 400 });
        } else {
            const hashedToken = await bcryptjs.hash(user._id.toString(), 10)
            console.log(hashedToken);
            await User.findByIdAndUpdate(user._id.toString(), 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})


            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: "harshjain0461@gmail.com",
                    pass: "wjyz widw ewvc gsdc"
                },
            })

            const mailOptions = {
                from: 'harshjain0461@gmail.com',
                cc: "harshjain0461@gmail.com",
                to: email,
                subject: 'Reset Password',
                html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click <a href="\nhttp://localhost:3000/resetPassword/?token=${hashedToken}">here</a> to reset your password}
            or copy and paste the link below in your browser. <br> \nhttp://localhost:3000/resetPassword?token=${hashedToken}
            </p>`
                // text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/resetPassword/?token=${hashedToken}`
            };

            await transporter.sendMail(mailOptions);

            return NextResponse.json({
                message: "Password reset link sent to your mail",
                success: true,
            });
        };

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

