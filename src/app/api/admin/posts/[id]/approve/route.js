export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function POST(_request, { params }) {
  await connectToDatabase();
  const post = await Post.findByIdAndUpdate(
    params.id,
    { status: "approved" },
    { new: true }
  );
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

