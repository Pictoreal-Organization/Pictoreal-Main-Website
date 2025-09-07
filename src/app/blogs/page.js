"use client";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function BlogsPage() {
  const blogs = [
    {
      id: "blog5",
      title: "Dreams and Deadlines",
      authors: "Harshit Vora, Omkar Desai",
      img: "/blogs/blog5-poster-img.png",
      excerpt:
        "Balancing academics and personal interests isn’t about sacrificing moments—it’s about weaving them together. A journey through 4 years of student life...",
    },
    {
      id: "blog2",
      title: "Mysteries of Particle Physics",
      authors: "Shrihari Kulkarni",
      img: "/blogs/blog2-poster-img.png",
      excerpt:
        "Step into the fascinating world of particle physics—a cosmic dance of quarks, leptons, and universal forces that shape the universe around us...",
    },
    {
      id: "blog3",
      title: "Error 500 - The Flawed Beauty of Your Day",
      authors: "Nehal Shivane, Sampada Tagalpallewar, Shruti Mone",
      img: "/blogs/blog3-poster-img.png",
      excerpt:
        "Life, just like programming, is full of unexpected errors. Instead of fearing mistakes, embrace them as opportunities to learn, grow, and redefine success...",
    },
    {
      id: "dakhni",
      title: "अरे बैगन! – चलिये, जानते है दक्खनी की दुनिया",
      authors: "Ayan Pathan",
      img: "/blogs/blog-dakhni-poster.png",
      excerpt:
        "Dakhni isn’t just Hyderabadi slang—it’s a centuries-old language shaped by Hindi, Urdu, Marathi, Kannada, and Telugu influences. Let’s explore its roots...",
    },
  ];

  return (
    <div className="bg-paleskyblue min-h-screen p-6">
      {/* Header */}
      <h1 className="text-center font-bold text-3xl mb-4 text-deepnavy">
        BLOGS
      </h1>
      <div className="flex items-center justify-center mb-6">
        <div className="w-32 h-[2px] bg-deepnavy"></div>
        <span className="mx-2 text-deepnavy">✦</span>
        <div className="w-32 h-[2px] bg-deepnavy"></div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Stories, Authors, or Themes..."
            className="w-full px-10 py-2 border border-deepnavy rounded-lg focus:outline-none text-deepnavy placeholder:text-deepnavy"
          />
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-deepnavy text-xl" />
        </div>

        <div className="flex gap-4">
          {/* Genres Dropdown */}
          <div className="relative">
            <select className="appearance-none px-4 py-2 border border-deepnavy rounded-lg text-deepnavy pr-10 focus:outline-none">
              <option>All Genres</option>
              <option>Fiction</option>
              <option>Non-fiction</option>
              <option>Poetry</option>
            </select>
            <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-deepnavy pointer-events-none" />
          </div>

          {/* Sorting Dropdown */}
          <div className="relative">
            <select className="appearance-none px-4 py-2 border border-deepnavy rounded-lg text-deepnavy pr-10 focus:outline-none">
              <option>Latest Creation</option>
              <option>Oldest First</option>
              <option>Most Popular</option>
            </select>
            <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-deepnavy pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Blog Cards */}
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-start gap-6 border border-deepnavy"
          >
            {/* Image */}
            <img
              src={blog.img}
              alt={blog.title}
              className="w-40 h-40 object-cover border-2 border-deepnavy rounded"
            />

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-deepnavy">{blog.title}</h2>
              <p className="text-sm text-deepnavy mt-1">
                <span className="font-semibold">Author: </span>
                {blog.authors}
              </p>
              <p className="text-deepnavy/80 mt-3">{blog.excerpt}</p>

              {/* Tags + Button */}
              <div className="flex gap-3 mt-4">
                <span className="px-3 py-2 bg-paleskyblue text-deepnavy rounded-md text-sm border border-deepnavy">
                  Featured
                </span>

                <span className="px-3 py-2 bg-paleskyblue text-deepnavy rounded-md text-sm border border-deepnavy">
                  Student Life
                </span>

                <Link
                  href={`/blogs/${blog.id}`}
                  className="px-4 py-2 bg-deepnavy text-white rounded-md hover:bg-paleskyblue hover:text-deepnavy border border-deepnavy transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
