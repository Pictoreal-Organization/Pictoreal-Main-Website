import dbConnect from "../../../../lib/mongodb";
import Blog from "../../../../models/Blog";

// ------------------- GET: Fetch blogs for admin dashboard -------------------
export async function GET(req) {
  await dbConnect();
  try {
    // Fetch blogs that are pending review or drafts
    const blogs = await Blog.find({ status: { $in: ["pending_review", "draft"] } })
      .sort({ createdAt: -1 }); // newest first

    return new Response(
      JSON.stringify({ success: true, data: blogs }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Admin GET blogs error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ------------------- POST: Create a new blog (admin override) -------------------
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();

    const { title, description, banner, content, authorDetails } = body;

    // Validate required fields
    if (!title || !description || !banner || !content) {
      return new Response(
        JSON.stringify({ success: false, error: "Title, description, banner, and content are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitize authorDetails and fill defaults
    const sanitizedAuthor = {
      name: authorDetails?.name ? String(authorDetails.name) : "Unknown Author",
      department: authorDetails?.department ? String(authorDetails.department) : "Unknown Department",
      passingYear: authorDetails?.passingYear ? Number(authorDetails.passingYear) : new Date().getFullYear()
    };

    const sanitizedBody = {
      title: String(title),
      description: String(description),
      banner: String(banner),
      content: JSON.stringify(content),
      tags: Array.isArray(body.tags) ? body.tags : [],
      coAuthors: Array.isArray(body.coAuthors) ? body.coAuthors : [],
      copyEditors: Array.isArray(body.copyEditors) ? body.copyEditors : [],
      status: body.status || "draft",
      isFeaturedByPictoreal: !!body.isFeaturedByPictoreal,
      rejectionReason: body.rejectionReason || null,
      reviewedBy: body.reviewedBy || null,
      reviewedAt: body.reviewedAt || null,
      authorDetails: sanitizedAuthor
    };

    const newBlog = await Blog.create(sanitizedBody);

    return new Response(
      JSON.stringify({ success: true, data: newBlog }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Admin POST blog error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ------------------- PUT: Update a blog (approve/reject, edit content) -------------------
export async function PUT(req) {
  await dbConnect();
  try {
    const { _id, ...updateData } = await req.json();

    if (!_id) {
      return new Response(
        JSON.stringify({ success: false, error: "Blog ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitize authorDetails if provided
    if (updateData.authorDetails) {
      const author = updateData.authorDetails;
      updateData.authorDetails = {
        name: author?.name ? String(author.name) : "Unknown Author",
        department: author?.department ? String(author.department) : "Unknown Department",
        passingYear: author?.passingYear ? Number(author.passingYear) : new Date().getFullYear()
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return new Response(
        JSON.stringify({ success: false, error: "Blog not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedBlog }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Admin PUT blog error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
