// import mongoose from 'mongoose';

// const BlogSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   banner: {
//     type: String,
//     default: '',
//   },
//   tags: [{
//     type: String,
//   }],
//   author: {
//     type: String,
//     required: true,
//   },
//   activity: {
//     likes: {
//       type: Number,
//       default: 0,
//     },
//     comments: {
//       type: Number,
//       default: 0,
//     },
//     reads: {
//       type: Number,
//       default: 0,
//     },
//   },
//   draft: {
//     type: Boolean,
//     default: false,
//   },
//   publishedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);


// import mongoose from "mongoose";

// const BlogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//       maxlength: [150, "Title cannot exceed 150 characters"],
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       trim: true,
//       maxlength: [200, "Description cannot exceed 200 characters"],
//     },
//     banner: {
//       type: String,
//       required: [true, "Banner image URL is required"],
//     },
//     content: {
//       type: String, // Store serialized JSON from your editor
//       required: [true, "Content is required"],
//     },
//     tags: {
//       type: [String],
//       default: [],
//     },
//     author: {
//       type: String,
//       required: [true, "Author is required"],
//       default: "Anonymous",
//     },
//     draft: {
//       type: Boolean,
//       default: true,
//     },
//     publishedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    banner: {
      type: String,
      required: [true, "Banner image URL is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"], // Stored as JSON string
    },
    tags: {
      type: [String],
      default: [],
    },
    authorDetails: {
      name: { type: String, required: [true, "Author name is required"] },
      department: { type: String, required: [true, "Department is required"] },
      passingYear: { type: Number, required: [true, "Passing year is required"] },
    },
    coAuthors: {
      type: [String],
      default: [],
    },
    copyEditors: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "pending_review", "published", "rejected"],
      default: "draft",
    },
    isFeaturedByPictoreal: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    rejectionReason: {
      type: String,
      default: null,
    },
    reviewedBy: {
      type: String,
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

