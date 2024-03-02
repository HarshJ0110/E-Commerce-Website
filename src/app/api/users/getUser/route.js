import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {    
    try {
        
        const reqBody = await request.json()
        const {id} = reqBody;
        console.log(id);
        // Fetch non-verified users
        // const id = request.url.split("/").pop();
        // console.log(id);
        const user = await User.findById(id);
        console.log(user);
        return NextResponse.json({
            user
        });
    } catch (error) {
        // console.error("Error fetching verified users :", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
