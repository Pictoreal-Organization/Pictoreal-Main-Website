// app/api/auth/verify/route.js
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret_key";

export async function POST(req) {
  try {
    const body = await req.json();
    const token = body?.token;

    if (!token) {
      return new Response(
        JSON.stringify({ valid: false, error: "No token provided" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const decoded = jwt.verify(token, SECRET);
      // decoded will contain what you signed (userId, role, etc.)
      return new Response(
        JSON.stringify({ valid: true, decoded }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid or expired token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error("Token verify error:", err);
    return new Response(
      JSON.stringify({ valid: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
