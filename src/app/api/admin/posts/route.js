export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";

// GET pending posts
export async function GET() {
  await connectToDatabase();
  const posts = await Post.find({ status: "pending" }).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

