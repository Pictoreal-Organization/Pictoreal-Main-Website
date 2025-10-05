import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password, role, department, passingYear } = await req.json();

    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "Name, email , password , role are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Use role from frontend, default to "user"
      department,
      passingYear,
    });

    await newUser.save();

    // Generate JWT token for auto-login
    const token = jwt.sign(
      { 
        id: newUser._id, 
        email: newUser.email, 
        role: newUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return token and user data for auto-login
    return new Response(
      JSON.stringify({
        success: true,
        message: "User created successfully",
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          department: newUser.department,
          passingYear: newUser.passingYear,
        }
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}