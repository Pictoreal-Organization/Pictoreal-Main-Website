import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret_key"; // fallback if not set

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(
      password,
      user.password || user.passwordHash // support both field names
    );
    if (!isMatch) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    // Send back user details + token
    return new Response(
      JSON.stringify({
        success: true,
        token,
        user: {
          email: user.email,
          name: user.name,
          department: user.department,
          passingYear: user.passingYear,
          role: user.role,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
