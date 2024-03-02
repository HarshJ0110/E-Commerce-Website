import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request) {    
    try {
        // Fetch non-verified users
        const verifiedUsers = await User.find({ isVerified: true });
        
        if (!verifiedUsers || verifiedUsers.length === 0) {
            return NextResponse.json({ message: "No verified users found" }, { status: 404 });
        }
        
        return NextResponse.json({
            message: "verified users found",
            data: verifiedUsers
        });
    } catch (error) {
        // console.error("Error fetching verified users gfchbyjuk:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
