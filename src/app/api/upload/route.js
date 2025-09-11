import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const fileStr = req.body.data; // base64 image string
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "blog-banners",
    });
    res.status(200).json({ imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}
