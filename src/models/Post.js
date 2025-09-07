import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    contentHtml: { type: String, required: true },
    thumbnailUrl: { type: String },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
    author: {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
      department: String,
      yearOfPassing: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);


