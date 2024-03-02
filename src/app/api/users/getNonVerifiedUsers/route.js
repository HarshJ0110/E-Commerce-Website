import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request) {    
    try {
        // Fetch non-verified users
        const nonVerifiedUsers = await User.find({ isVerified: false });
        
        if (!nonVerifiedUsers || nonVerifiedUsers.length === 0) {
            return NextResponse.json({ message: "All users are verified users found" }, { status: 404 });
        }
        
        return NextResponse.json({
            message: "Non-verified users found",
            data: nonVerifiedUsers
        });
    } catch (error) {
        // console.error("Error in fetching non-verified users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
