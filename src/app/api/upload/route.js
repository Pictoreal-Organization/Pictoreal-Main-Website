import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // Get body as JSON (since you're sending base64 data)
    const body = await request.json();
    const fileStr = body.data; // base64 image string

    if (!fileStr) {
      return Response.json({ error: "No image data provided" }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "blog-banners",
    });

    return Response.json({ imageUrl: uploadResponse.secure_url }, { status: 200 });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "Upload endpoint active" });
}
