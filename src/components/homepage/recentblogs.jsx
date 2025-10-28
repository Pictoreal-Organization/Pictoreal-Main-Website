"use client";
import Link from "next/link";
import Image from "next/image";
import ArrowBtn from "./arrowbtn";

export default function RecentBlogs() {
  const blogs = [
    {
      id: "blog6",
      title: "हिंसेची सावली",
      authors: "Chaitanya Kulkarni",
      excerpt:
        "Violence leaves a lasting impact, but media often conceals its true nature, whether through humor or omission. This blog uncovers the rare works that confront its harsh reality... and reveal its lasting effects.",
        img: "/blog/Blog6/blog6-hp-poster-img.png",
      imagePosition: "top", // 👈 first card: show top
    },
    {
      id: "blog5",
      title: "Dreams and Deadlines",
      authors: "Harshit Vora, Omkar Desai",
      excerpt:
        "A deep dive into balancing creative aspirations with the practicalities of project timelines and client expectations.",
      img: "/blog/blog5-poster-img.png",
      imagePosition: "top", // 👈 first card: show top
    },
  ];

  return (
    <section 
    id="recent-blogs" 
    className="bg-[#111C33] text-white min-h-screen flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <p className="text-3xl md:text-5xl font-bold font-heading text-center md:text-left">
            Recent Blogs
          </p>
          <div className="hidden md:block">
            <ArrowBtn
              text="Read All Blogs"
              path="/blogs"
              borderColor="#DDF1FF"
            />
          </div>
        </div>

        {/* Blog Cards */}
        <div className="flex flex-col items-center justify-center md:gap-20">
        <div className="w-10/12 sm:w-full space-y-6">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className={`group relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } h-full md:h-[320px]`} // ✅ Fixed equal height
              >
                {/* Image Section */}
                <div className="relative md:w-2/5 h-52 md:h-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    width={400}
                    height={220}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                      blog.imagePosition === "top"
                        ? "object-top"
                        : "object-center"
                    }`}
                  />

                  {/* Floating Tags
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/90 text-[#111C33] rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div> */}
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-5 md:p-6 flex flex-col justify-between h-full">
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl font-heading font-bold text-[#111C33] mb-2 leading-tight group-hover:text-[#003366] transition-colors duration-300">
                      {blog.title}
                    </p>

                    <p className="text-[#111C33]/60 font-medium mb-3 text-sm">
                      By {blog.authors}
                    </p>

                    <p className="text-[#111C33]/80 font-body text-sm leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Action Area */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#111C33]/10">
                    <div className="text-xs text-[#111C33]/50 font-medium">
                      5 min read
                    </div>
                    <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowBtn
                        text="Read Article"
                        path={`/blogs/${blog.id}`}
                        borderColor="#111C33"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <div className="md:hidden">
            <ArrowBtn
              text="Read All Blogs"
              path="/blogs"
              borderColor="#DDF1FF"
            />
          </div>
          {/* <ArrowBtn
            text="Write a Blog"
            path="/blogs/write"
            bgColor="#DDF1FF"
            textColor="#111C33"
            circleBg="#111C33"
            hoverColor="#EAF7FF"
            arrowColor="#DDF1FF"
          /> */}
        </div>
      </div>
    </section>
  );
}
