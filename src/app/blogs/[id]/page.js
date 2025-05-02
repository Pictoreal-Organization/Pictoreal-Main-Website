// src/app/blogs/[id]/page.js
"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import blogData from "../../../data/blogData"; // Import blog data from a data file or fetch it dynamically

const BlogPage = () => {
  const { id } = useParams();

  // Find the specific blog post data by id
  const blogPost = blogData.find((post) => post.id === id);

  if (!blogPost) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="flex flex-col p-10">
      <div className="relative bg-firefly w-4/5 max-w-[1200px] p-5 border-[10px] border-lynch mx-auto">
        
        <div className="flex items-center justify-center gap-2 absolute top-4 left-4">
          <Link href="/blogs">
            <div className="flex items-center justify-center h-10 w-24 rounded-2xl border-2 border-black bg-lynch text-white shadow-md hover:bg-[#561A34] transition-transform transform hover:scale-110">
              Back
            </div>
          </Link>
        </div>

        <h1 className="font-raleway font-medium pt-10 text-5xl text-bali text-center">
          {blogPost.title}
        </h1>

        <div className="flex items-center justify-center my-8">
          <Image src="/blog/1.svg" alt="Design" width={100} height={100} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex w-7/10 gap-8 mx-16">
            <Image
              src={blogPost.imgSrc}
              alt="Blog Poster"
              width={800}
              height={500}
              className="w-full border-5 border-[#3A0622]"
            />
          </div>
          <div className="font-poppins text-[20px] text-lynch pl-8 pt-8">
            <span className="text-black">Author: </span>{blogPost.authors}
          </div>
        </div>

        <div className="pt-8 text-justify font-poppins text-[17px] text-submarine p-8">
          {/* Content Section */}
          <article className="p-5">
            <p>{blogPost.content}</p>
          </article>

          {/* Body Section */}
          <article className="p-5">
            <p>{blogPost.body}</p>
          </article>

          <div className="flex justify-center items-center w-full mt-8">
            <Image
              src="/blog/3.svg"
              alt="Content Image"
              width={600}
              height={400}
              className="w-7/10 border-5 border-[#561A34]"
            />
          </div>

          {/* Conclusion Section */}
          <article className="p-5 mt-8 font-semibold text-bali text-lg">
            <p>{blogPost.conclusion}</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
