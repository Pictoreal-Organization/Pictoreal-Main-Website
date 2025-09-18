"use client";
import Link from "next/link";
// The 'next/image' component is now being used as requested.
import Image from "next/image"; 
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ArrowBtn from "@/components/homepage/arrowbtn";

export default function BlogsPage() {
  const blogs = [
    {
      id: "blog5",
      title: "Dreams and Deadlines",
      authors: "Harshit Vora, Omkar Desai",
      img: "/blog/blog5-poster-img.png",
      excerpt:
        "Balancing academics and personal interests isn’t about sacrificing moments—it’s about weaving them together. A journey through 4 years of student life...",
    },
    {
      id: "blog4",
      title: "अरे बैगन! – चलिये, जानते है दक्खनी की दुनिया",
      authors: "Ayan Pathan",
      img: "/blog/blog-dakhni-poster.png",
      excerpt:
        "Dakhni isn’t just Hyderabadi slang—it’s a centuries-old language shaped by Hindi, Urdu, Marathi, Kannada, and Telugu influences. Let’s explore its roots...",
    },
    {
      id: "blog3",
      title: "Error 500 - The Flawed Beauty of Your Day",
      authors: "Nehal Shivane, Sampada Tagalpallewar, Shruti Mone",
      img: "/blog/blog3-poster-img.png",
      excerpt:
        "Life, just like programming, is full of unexpected errors. Instead of fearing mistakes, embrace them as opportunities to learn, grow, and redefine success...",
    },
    {
      id: "blog2",
      title: "Mysteries of Particle Physics",
      authors: "Shrihari Kulkarni",
      img: "/blog/blog2-poster-img.png",
      excerpt:
        "Step into the fascinating world of particle physics—a cosmic dance of quarks, leptons, and universal forces that shape the universe around us...",
    },
    {
      id: "blog1",
      title: "Uncanny Valley",
      authors: "Prem Rahinj, SpondonNath",
      img: "/blog/blog1-poster-img.jpg",
      excerpt:
        "Uncanny Valley is where AI gets eerily close to being human—so close, it’s unsettling. As AI becomes more lifelike, even small imperfections in appearance or behavior can trigger discomfort or unease in us.",
    },
  ];

  return (
    <div className="bg-paleskyblue min-h-screen px-4 md:p-6">
      {/* Header */}
      <p className="text-center font-bold text-3xl text-[#001730] md:text-5xl font-heading mb-4">
        BLOGS
      </p>

      {/* Search + Filters */}
      {/* <div className="flex flex-col md:flex-row gap-4 mt-10 justify-center w-full px-4 md:px-0 items-center mb-10">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Stories, Authors, or Themes..."
            className="w-full px-10 py-2 border-2 shadow-md bg-white border-deepnavy rounded-lg focus:outline-none text-deepnavy placeholder:text-deepnavy"
          />
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-deepnavy text-xl" />
        </div>

        <div className="flex gap-4 w-full md:w-auto"> */}
      {/* Genres Dropdown */}
      {/* <div className="flex flex-wrap gap-4 sm:gap-6 items-center w-full"> */}
      {/* Genre Dropdown */}
      {/* <div className="relative w-full shadow-md sm:w-auto">
              <select className="appearance-none w-full sm:w-auto bg-white px-4 py-2 border-2 border-deepnavy rounded-lg text-deepnavy pr-10 focus:outline-none text-sm sm:text-base">
                <option>All Genres</option>
                <option>Fiction</option>
                <option>Non-fiction</option>
                <option>Poetry</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-deepnavy pointer-events-none" />
            </div> */}

      {/* Sorting Dropdown */}
      {/* <div className="relative shadow-md w-full sm:w-auto">
              <select className="appearance-none w-full sm:w-auto px-4 py-2 border-2 bg-white border-deepnavy rounded-lg text-deepnavy pr-10 focus:outline-none text-sm sm:text-base">
                <option>Latest Creation</option>
                <option>Oldest First</option>
                <option>Most Popular</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-deepnavy pointer-events-none" />
            </div>
          </div>
        </div>
      </div> */}

      {/* Blog Cards */}
      <div className="rounded-4xl p-6 flex flex-col mx-auto items-start gap-8 max-w-6xl">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            // CHANGE 1: Centered items on mobile and aligned them to the start on desktop.
            className="bg-white shadow-md rounded-4xl p-6 flex flex-col pt-8 sm:pt-6 items-center md:flex-row md:items-start gap-6 border border-white"
          >
            {/* Image */}
            <Image
              src={blog.img}
              alt={blog.title}
              width={160}
              height={182}
              // CHANGE 2: Made image responsive while maintaining aspect ratio.
              className="w-full max-w-[240px] md:w-[140px] lg:w-[160px] h-auto object-cover object-top rounded border-2 border-[#1a365d] aspect-[7/8]"
            />

            {/* Content */}
            <div className="flex-1">
              <p className="text-2xl md:text-3xl font-heading font-bold text-deepnavy text-center md:text-left">
                {blog.title}
              </p>
              <p className="text-sm md:text-base font-body text-deepnavy mt-1 text-center md:text-left">
                <span className="font-semibold">Author: </span>
                {blog.authors}
              </p>
              <p className="text-deepnavy/80 font-body mt-3 text-sm text-center md:text-left">
                {blog.excerpt}
              </p>

              {/* Tags + Button */}
              {/* CHANGE 3: Centered tags/button on mobile and used flex-wrap for better flow. */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 md:justify-start">
                {/* <span className="px-4 py-1 bg-[#003666] text-white rounded-full text-xs md:text-sm border flex items-center justify-center">
                  Featured
                </span>

                <span className="whitespace-nowrap px-4 py-1 bg-[#003666] text-white rounded-full text-xs md:text-sm border flex items-center justify-center">
                  Student Life
                </span> */}

                <div className="md:ml-auto flex">
                  <ArrowBtn text="Read More" path={`/blogs/${blog.id}`}/>
                </div> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

