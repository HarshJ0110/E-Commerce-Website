import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

connect();

export async function PUT(request) {
    try {
        const reqBody = await request.json();
        const { _id, storeName, email, password, location, managerName, phoneNo } = reqBody;

        // Check if the user exists
        const user = await User.findById(_id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update user data
        user.storeName = storeName;
        user.email = email;
        user.location = location;
        user.managerName = managerName;
        user.phoneNo = phoneNo;

        // If password is provided, hash and update
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            // user.password = hashedPassword;
        }

        // Save updated user data
        const updatedUser = await user.save();

        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            updatedUser
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
