"use client";
import { useEffect } from "react";
import Link from "next/link";

const Blogs = () => {
  useEffect(() => {
    const loader = document.getElementById("preloader");
    window.addEventListener("load", () => {
      if (loader) loader.style.display = "none";
    });
  }, []);

  const blogPosts = [
    {
      id: "blog1",
      title: "Uncanny Valley",
      authors: "Prem Rahinj, Spondon Nath",
      imgSrc: "/blog/blog1-poster-img.jpg",
    },
    {
      id: "blog2",
      title: "Mysteries of Particle Physics",
      authors: "Shrihari Kulkarni",
      imgSrc: "/blog/blog2-poster-img.png",
    },
    {
      id: "blog3",
      title: "Error 500",
      authors: "Nehal Shivane, Sampada Tagalpallewar, Shruti Mone",
      imgSrc: "/blog/blog3-poster-img.png",
    },
    {
      id: "blog4",
      title: "अरे बैगन ! - चलिये, जानते है दक्खनी की दुनिया ।",
      authors: "Ayan Pathan",
      imgSrc: "/blog/blog-dakhni-poster.png",
    },
    {
      id: "blog5",
      title: "Dreams and Deadline",
      authors: "Harshit Vora, Omkar Desai",
      imgSrc: "/blog/blog5-poster-img.png",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full relative mt-5 text-center">
        <div className="text-4xl md:text-5xl font-bold text-[#49112E] mb-20">
          BLOGS
        </div>
        <img
          src="/blog/decor.png"
          alt=""
          className="w-[300px] md:w-[400px] lg:w-[600px] mx-auto absolute top-20 md:top-[5rem]"
        />
      </div>

      <div className="flex justify-center mt-10 sm:mt-20 overflow-hidden mb-10 px-5 lg:px-10 lg:mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="w-full sm:w-[280px] lg:w-[300px] h-auto bg-[#D2B49A] p-4 border-4 border-[#3A0622] shadow-lg rounded-lg flex flex-col justify-between"
            >
              <div className="flex justify-center w-full h-[160px] lg:h-[180px]">
                <img
                  src={post.imgSrc}
                  alt={post.title}
                  className="w-[140px] lg:w-[160px] border-2 border-black"
                />
              </div>
              <div className="flex flex-col items-center mt-2">
                <h2 className="text-lg lg:text-xl font-bold text-center">
                  {post.title}
                </h2>
                <h4 className="text-sm lg:text-base font-semibold text-center">
                  Author: <span>{post.authors}</span>
                </h4>
              </div>
              {/* Button positioned at the bottom */}
              <div className="flex justify-center mt-4">
                <Link href={`/blogs/${post.id}`}>
                  <button className="bg-[#6f2143] hover:bg-[#561A34] transition-transform transform hover:scale-105 rounded-lg text-sm lg:text-lg font-medium text-white px-4 py-2 border-2 border-black shadow-md">
                    Read
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
