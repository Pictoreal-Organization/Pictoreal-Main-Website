// import dbConnect from '../../../lib/mongodb';
// import Blog from '../../../models/Blog';

// export default async function handler(req, res) {
//   const { method } = req;

//   await dbConnect();

//   switch (method) {
//     case 'GET':
//       try {
//         const blogs = await Blog.find({ draft: false }).sort({ publishedAt: -1 });
//         res.status(200).json({ success: true, data: blogs });
//       } catch (error) {
//         res.status(400).json({ success: false, error: error.message });
//       }
//       break;

//     case 'POST':
//       try {
//         const blog = await Blog.create(req.body);
//         res.status(201).json({ success: true, data: blog });
//       } catch (error) {
//         res.status(400).json({ success: false, error: error.message });
//       }
//       break;

//     default:
//       res.status(400).json({ success: false, message: 'Method not allowed' });
//       break;
//   }
// }

import dbConnect from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json(); // App Router uses req.json()
    
    // Ensure content is string
    if (typeof body.content !== "string") {
      body.content = JSON.stringify(body.content || []);
    }

    const newBlog = await Blog.create(body);

    return new Response(
      JSON.stringify({ success: true, data: newBlog }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("MongoDB create error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

