export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";

// GET /api/posts?status=approved
export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "approved";
  const filter = status ? { status } : {};
  const posts = await Post.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

// POST /api/posts
export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  const { title, description, contentHtml, thumbnailUrl, author } = body;
  if (!title || !description || !contentHtml || !author?._id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const post = await Post.create({
    title,
    description,
    contentHtml,
    thumbnailUrl,
    status: "pending",
    author,
  });
  return NextResponse.json(post, { status: 201 });
}

