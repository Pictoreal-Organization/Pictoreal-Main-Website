import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// GET /api/blogs/[id]
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Increment read count if activity exists
    if (blog.activity && typeof blog.activity.reads === "number") {
      blog.activity.reads += 1;
      await blog.save();
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT /api/blogs/[id] - update blog OR accept/reject by admin
export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const { status, title, content } = await req.json();

    // Allowed statuses for admin action
    const allowedStatuses = ["pending", "accepted", "rejected"];

    const updateData = {
      ...(title && { title }),
      ...(content && { content }),
    };

    // Only update status if valid
    if (status && allowedStatuses.includes(status)) {
      updateData.status = status;
    }

    const blog = await Blog.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE /api/blogs/[id]
export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const deletedBlog = await Blog.findByIdAndDelete(params.id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
