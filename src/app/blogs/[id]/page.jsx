// import dbConnect from '../../../lib/mongodb';
// import Blog from '../../../models/Blog';
// import mongoose from 'mongoose';

// const BlogPage = async ({ params }) => {
//   const { id } = params;

//   console.log("Received blog ID:", id);

//   await dbConnect();

//   let blog = null;

//   // Ensure id is a valid ObjectId
//   if (mongoose.Types.ObjectId.isValid(id)) {
//     blog = await Blog.findById(id).lean(); // ✅ fixed here
//   } else {
//     console.warn("Invalid blog ID format:", id);
//   }

//   if (!blog) {
//     // Optional: render a friendly "Blog not found" page instead of throwing
//     return <div className="p-8 text-center text-red-500 font-bold">Blog not found.</div>;
//   }

//   let content = [];
//   try {
//     content = JSON.parse(blog.content || "[]");
//   } catch (err) {
//     console.error("Error parsing blog content JSON:", err);
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {blog.banner && (
//         <img src={blog.banner} className="w-full h-64 object-cover rounded mb-6" alt="Blog banner" />
//       )}

//       <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//       <p className="text-gray-600 mb-4">By {blog.author}</p>
//       <p className="text-lg mb-6">{blog.description}</p>

//       <div className="prose max-w-none">
//         {content.map((block, idx) => (
//           <div key={idx} className="mb-4">
//             {block.type === 'text' && <p>{block.content}</p>}
//             {block.type === 'heading' && <h2>{block.content}</h2>}
//             {block.type === 'image' && <img src={block.content} className="w-full rounded" alt={block.caption || "Blog image"} />}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogPage;

import dbConnect from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
import mongoose from "mongoose";
import ArrowBtn from "@/components/homepage/arrowbtn";

const BlogPage = async (context) => {
  const { params } = context;
  const { id } = params;

  await dbConnect();

  let blog = null;

  if (mongoose.Types.ObjectId.isValid(id)) {
    blog = await Blog.findById(id).lean();
  }

  if (!blog) {
    return (
      <div className="p-8 text-center text-red-500 font-bold">
        Blog not found.
      </div>
    );
  }

  // ✅ Parse content safely (handles double-stringified JSON)
  let contentBlocks = [];
  try {
    let parsed = blog.content;

    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed); // first parse
    }

    // Sometimes it's stringified twice
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed); // second parse
    }

    if (Array.isArray(parsed)) {
      contentBlocks = parsed;
    }
  } catch (err) {
    console.error("Error parsing blog content:", err);
  }

  return (
    <div className="min-h-screen bg-[#ddf1ff] py-10 px-4">
      <div className="relative  w-full md:w-4/5 max-w-[75vw] mx-auto bg-[#b3dfff] rounded-3xl border-3 shadow-border-20 shadow-[0_8px_15px_rgba(0,51,102,1)] shadow-4xl px-6 md:px-10 py-8">
        {/* Title */}
        <div className="  w-auto">
          <div className="font-heading text-[#111c33]  pt-2 sm:text-5xl text-2xl font-extrabold text-firefly text-center mt-5 mb-8 sm:mt-14 sm:mb-5 ">
            {blog.title}
          </div>
        </div>

        {/* Banner Section */}
        {blog.banner && (
          <div className="max-h-auto md:max-w-lg  w-full py-5 mx-auto justify-items-center">
            <img
              src={blog.banner}
              alt="Blog banner"
              className=" w-2/3 h-auto rounded-xl object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Author */}
        <div className="text-base md:text-base lg:text-[20px] font-body mb-8 text-firefly flex justify-center mt-4 px-4 text-center ">
          <p className="text-firefly">
            <strong>Author: </strong>{" "}
            {blog.authorDetails?.name || "Unknown Author"}
          </p>
        </div>

        {/* Co-Authors */}
        {blog.coAuthors?.length > 0 && (
          <p className="text-base font-body md:text-lg text-gray-800 mb-2">
            <strong>Co-Authors:</strong> {blog.coAuthors.join(", ")}
          </p>
        )}

        {/* Editors */}
        {blog.copyEditors?.length > 0 && (
          <p className="text-base font-body md:text-lg text-gray-800 mb-2">
            <strong>Editors:</strong> {blog.copyEditors.join(", ")}
          </p>
        )}

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <p className="text-base font-body md:text-lg text-gray-800 mb-4">
            <strong>Tags:</strong> {blog.tags.join(", ")}
          </p>
        )}

        {/* Description */}
        {/* <p className="font-body text-base relative pt-4 mb-4 md:text-lg leading-relaxed text-gray-800">
          <strong>Description: </strong> {blog.description}
        </p> */}

        {/* ✅ Render content blocks */}
        <div className="text-justify font-body text-[17px] text-firefly p-8 pl-[10px] pr-[10px] pt-[30px] pb-[30px] ">
          {contentBlocks.map((block, idx) => {
            switch (block.type) {
              case "heading":
                return (
                  <div key={idx} className="font-heading text-3xl font-semibold text-firefly mb-3 mt-8 px-4 md:px-0 text-center md:text-left">
                    {block.content}
                  </div>
                );
              case "text":
                return (
                  <p
                    key={idx}
                    className="mb-5"
                  >
                    {block.content}
                  </p>
                );
              case "image":
                return (
                  <figure key={idx} className="mb-6">
                  <div className="blog-content-image border-[5px] border-[#1a365d] w-full md:w-1/3 mx-auto mb-5">
                    <img
                      src={block.content}
                      alt={block.caption || "Blog image"}
                      className="w-full h-auto"
                    />
                    </div>
                    {block.caption && (
                      <figcaption className="text-sm text-gray-500 text-center mt-2">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              default:
                return (
                  <p key={idx} className="mb-4">
                    {block.content}
                  </p>
                );
            }
          })}
        </div>
        <div className="flex flex-col items-center pt-8  w-full">
          <div className="flex">
            <ArrowBtn text="Back" path={`/blogs`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
