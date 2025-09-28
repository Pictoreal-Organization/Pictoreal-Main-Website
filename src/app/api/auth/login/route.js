import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret_key";

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    console.log("[Login Attempt] Email:", email);

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("[Login Failed] User not found");
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("[User Found] ID:", user._id.toString());

    // 2️⃣ Compare passwords
    const passwordField = user.password || user.passwordHash;
    if (!passwordField) {
      console.log("[Login Failed] No password field found in user document");
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const isMatch = await bcrypt.compare(password, passwordField);
    console.log("[Password Match]", isMatch);

    if (!isMatch) {
      console.log("[Login Failed] Incorrect password");
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    console.log("[Login Success] Token generated");

    // 4️⃣ Send back user details + token
    return new Response(
      JSON.stringify({
        success: true,
        token,
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[Login Error]", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error: " + err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
