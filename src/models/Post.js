import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  contentHtml: String,
  coverImage: String, // base64 string
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "published"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
