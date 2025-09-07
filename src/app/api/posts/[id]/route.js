export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(_request, { params }) {
  await connectToDatabase();
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(request, { params }) {
  await connectToDatabase();
  const body = await request.json();
  const post = await Post.findByIdAndUpdate(params.id, body, { new: true });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

