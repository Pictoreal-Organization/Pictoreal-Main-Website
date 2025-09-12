"use client";
import Link from "next/link";
import ArrowBtn from "./arrowbtn";

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
      img: "/blog/blog5-poster-img.png",
    },
    {
      id: "blog2",
      title: "Mysteries of Particle Physics",
      authors: "Shrihari Kulkarni",
      excerpt:
        "Step into the fascinating world of particle physics—a cosmic dance of quarks, leptons, and universal forces that shape the universe around us...",
      img: "/blog/blog2-poster-img.png",
    },
  ];

  return (
    <section className="bg-deepnavy text-white py-12 px-4 md:px-12">
          {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-col sm:items-center sm:justify-center gap-4">
          <h2 className="text-3xl font-bold font-heading text-center sm:text-left">
            Recent Blogs
          </h2>

          {/* CTA Button */}
          <div className="flex w-full md:w-[80%] mt-10 mb-10 justify-center lg:justify-end">
            <ArrowBtn text="Read Our Blogs" path="/blogs" borderColor="#DDF1FF" />
          </div>
        </div>
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
              className="block w-42 h-52 md:w-50 md:h-50 object-cover border-2 border-deepnavy rounded mx-auto md:mx-0"
            />

           {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-heading font-bold text-deepnavy text-center md:text-left">
                {blog.title}
              </h3>
              <p className="text-sm md:text-base font-body text-deepnavy mt-1 text-center md:text-left">
                <span className="font-semibold">Author: </span>
                {blog.authors}
              </p>
              <p className="text-deepnavy/80 font-body mt-3 text-center md:text-left">
                {blog.excerpt}
              </p>

              {/* Tags + Button */}
              <div className=" flex justify-between mt-5">
                <div className="flex justify-center items-center">
                  <span className="px-4 py-1.5 bg-[#1b3b64] text-white rounded-full text-xs md:text-sm border flex items-center justify-center">
                    Featured
                  </span>
                  <span className="px-2 py-1.5 bg-[#1b3b64] text-white rounded-full mx-2 text-xs md:text-sm border flex items-center justify-center">
                    Student Life
                  </span>
                </div>

                <div className="flex justify-start max-sm:text-sm sm:justify-end">
                  <ArrowBtn
                    text="View Blog"
                    path={`/blogs/${blog.id}`}
                    borderColor="#DDF1FF"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <ArrowBtn
          text="Write"
          path="/blogs"
          bgColor="#DDF1FF"
          textColor="#111C33"
          circleBg="#111C33"
          hoverColor="#EAF7FF"
          arrowColor="#DDF1FF"
        />
      </div>
    </section>
  );
}
