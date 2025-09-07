export const runtime = "nodejs";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, department, yearOfPassing } = body;
    console.log("Signup attempt:", { name, email, department, yearOfPassing });
    
    if (!name || !email || !password || !department || !yearOfPassing) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    
    await connectToDatabase();
    console.log("Database connected for signup");
    
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists:", email);
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password hashed");
    
    const user = await User.create({
      name,
      email,
      passwordHash,
      department,
      yearOfPassing: Number(yearOfPassing),
      role: "user",
    });
    
    console.log("User created successfully:", {
      id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      yearOfPassing: user.yearOfPassing,
      role: user.role
    });
    
    return NextResponse.json({ 
      id: user._id, 
      email: user.email,
      name: user.name,
      department: user.department,
      yearOfPassing: user.yearOfPassing
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal error: " + err.message }, { status: 500 });
  }
}

