"use client";
import Link from "next/link";

// Arrow Icon SVG Component
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0B2D4F"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7"></path>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);
export default function RecentBlogs() {
  const blogs = [
    {
      id: "blog5",
      title: "Dreams and Deadlines",
      authors: "Harshit Vora, Omkar Desai",
      excerpt:
        "Summary of the above blog Summary of the above blog, Summary of the above blog",
      img: "/blogs/blog5-poster-img.png",
    },
    {
      id: "blog2",
      title: "Mysteries of Particle Physics",
      authors: "Shrihari Kulkarni",
      excerpt:
        "Step into the fascinating world of particle physics—a cosmic dance of quarks, leptons, and universal forces that shape the universe around us...",
      img: "/blogs/blog2-poster-img.png",
    },
  ];

  return (
    <section className="bg-deepnavy text-white py-12 px-4 md:px-12">
      {/* Header */}
      <div className="flex items-center justify-between mx-a mb-10">
        <h2 className="flex-1 text-3xl font-bold text-center">
          Recent Blogs
        </h2>
        <Link
          href="/blogs"
          className="flex items-center gap-2  px-5 py-2 border border-white rounded-full hover:bg-paleskyblue hover:text-deepnavy transition ml-4"
        >
          Read Our Blogs{" "}
          <span className="bg-white rounded-full p-2 flex items-center justify-center">
            <ArrowIcon />
          </span>
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-paleskyblue shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6 border border-white"
          >
            {/* Image */}
            <img
              src={blog.img}
              alt={blog.title}
              className="w-32 h-32 md:w-50 md:h-50 object-cover border-2 border-deepnavy rounded"
            />

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-deepnavy">
                {blog.title}
              </h3>
              <p className="text-sm text-deepnavy mt-1">
                <span className="font-semibold">Author: </span>
                {blog.authors}
              </p>
              <p className="text-deepnavy/80 mt-3 text-sm md:text-base">
                {blog.excerpt}
              </p>

              {/* Tags + Button */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mt-6 items-center md:items-start sm:justify-start">
                <span className="px-4 py-1 bg-[#1b3b64] text-white rounded-full text-xs md:text-sm border flex items-center justify-center">
                  Featured
                </span>

                <span className="px-4 py-1 bg-[#1b3b64] text-white rounded-full text-xs md:text-sm border flex items-center justify-center">
                  Student Life
                </span>

               <Link
                  href={`/blogs/${blog.id}`}
                  className="ml-auto px-5 py-1 bg-deepnavy text-white rounded-full hover:bg-paleskyblue hover:text-deepnavy border border-deepnavy transition flex items-center gap-2
                    sm:px-4 sm:py-1 sm:text-sm
                    max-sm:w-full max-sm:justify-center max-sm:text-sm max-sm:px-3 max-sm:py-2 max-sm:rounded-md"
                >
                  View Magazines
                  <span className="bg-white rounded-full p-2 flex items-center justify-center max-sm:p-1">
                    <ArrowIcon />
                  </span>
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="flex justify-center mt-10">
        <button className="group flex items-center  pl-6 pr-1 py-1 gap-3  text-1xl font-medium bg-paleskyblue text-deepnavy rounded-full border border-deepnavy transition">
          Write
          <span className="bg-deepnavy text-white rounded-full w-12 h-12 flex items-center justify-center">
            ↗
          </span>
        </button>
      </div>
    </section>
  );
}
