import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log("Login attempt for:", email);
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    
    await connectToDatabase();
    console.log("Database connected for login");
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    console.log("User found, checking password...");
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      console.log("Invalid password for:", email);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    console.log("Login successful for:", email);
    
    // Return user data without sensitive information
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      department: user.department,
      yearOfPassing: user.yearOfPassing,
      role: user.role,
    };
    
    return NextResponse.json({ 
      success: true, 
      user: userData 
    });
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

