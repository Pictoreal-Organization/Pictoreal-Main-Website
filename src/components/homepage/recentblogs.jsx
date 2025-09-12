"use client";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import ArrowBtn from "./arrowbtn"; // Assuming ArrowBtn is in the same directory

export default function RecentBlogs() {
  const blogs = [
    {
      id: "blog5",
      title: "Dreams and Deadlines",
      authors: "Harshit Vora, Omkar Desai",
      excerpt: "A deep dive into balancing creative aspirations with the practicalities of project timelines and client expectations.",
      img: "/blog/blog5-poster-img.png",
      tags: ["Productivity", "Student Life"],
    },
    {
      id: "blog2",
      title: "Mysteries of Particle Physics",
      authors: "Shrihari Kulkarni",
      excerpt: "Step into the fascinating world of particle physics—a cosmic dance of quarks, leptons, and universal forces that shape our universe.",
      img: "/blog/blog2-poster-img.png",
      tags: ["Science", "Featured"],
    },
  ];

  return (
    <section className="bg-[#111C33] text-white min-h-screen flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 max-w-5xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-center md:text-left">
            Recent Blogs
          </h2>
          <div className="hidden md:block">
            <ArrowBtn text="Read All Blogs" path="/blogs" borderColor="#DDF1FF" />
          </div>
        </div>

        {/* Blog Cards */}
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#EAF7FF] shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 border border-[#DDF1FF]/20 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              {/* Image with Next.js */}
              <div className="flex-shrink-0 w-full md:w-auto">
                 <Image
                    src={blog.img}
                    alt={blog.title}
                    width={200}
                    height={200}
                    className="max-w-full h-auto max-h-60 md:w-48 md:h-48 object-cover rounded-lg border-2 border-[#111C33]/20 mx-auto"
                  />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-heading font-bold text-[#111C33]">
                  {blog.title}
                </h3>
                <p className="text-base font-body text-[#111C33]/80 mt-2">
                  <span className="font-semibold">By: </span>
                  {blog.authors}
                </p>
                <p className="text-[#111C33]/70 font-body mt-4">
                  {blog.excerpt}
                </p>

                {/* Tags + Button */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {blog.tags.map(tag => (
                       <span key={tag} className="px-4 py-1.5 bg-[#003366] text-white rounded-full text-sm font-semibold">
                         {tag}
                       </span>
                    ))}
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowBtn
                      text="View Blog"
                      path={`/blogs/${blog.id}`}
                      borderColor="#111C33"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons for different screen sizes */}
        <div className="flex justify-center mt-12 md:hidden">
            <ArrowBtn text="Read All Blogs" path="/blogs" borderColor="#DDF1FF" />
        </div>
        <div className="flex justify-center mt-12">
          <ArrowBtn
            text="Write a Blog"
            path="/blogs/write" // A more specific path
            bgColor="#DDF1FF"
            textColor="#111C33"
            circleBg="#111C33"
            hoverColor="#EAF7FF"
            arrowColor="#DDF1FF"
          />
        </div>
      </div>
    </section>
  );
}

