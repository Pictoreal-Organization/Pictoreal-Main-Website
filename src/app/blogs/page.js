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
      <h2 className="text-center font-bold text-3xl mb-4 text-deepnavy">
        BLOGS
      </h2>
      
      {/*SVG Design*/}
       <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '10vh', 
      width: '100%',  
      
    }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-20 80 1400 200" 
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%', 
          maxWidth: '700px', 
        }}
      >
        <g
          transform="translate(0.000000,411.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path d="M7465 3231 c-77 -14 -147 -56 -184 -111 -30 -44 -34 -57 -35 -118 0
            -54 5 -76 22 -104 29 -46 85 -96 130 -115 67 -28 164 -14 200 30 24 28 43 102
            37 140 -8 44 -49 97 -75 97 -31 0 -32 -17 -6 -63 30 -51 32 -78 9 -118 -38
            -65 -134 -61 -205 8 -91 89 -70 215 46 275 58 31 165 31 222 1 119 -63 183
            -223 140 -346 -19 -56 -80 -124 -136 -152 -40 -20 -64 -25 -128 -25 -161 0
            -265 62 -497 296 -152 153 -227 213 -312 250 -70 29 -158 54 -194 54 -42 0
            -131 -24 -174 -47 -70 -37 -155 -142 -155 -190 0 -10 -7 -29 -16 -41 l-15 -22
            -645 0 -645 0 -30 32 c-16 18 -29 35 -29 39 0 16 -64 31 -117 27 -42 -4 -84
            -18 -148 -49 l-90 -44 -986 -3 -985 -2 -77 52 c-42 29 -101 71 -132 92 -48 35
            -58 38 -78 28 -12 -7 -35 -16 -52 -21 -16 -5 -88 -33 -160 -61 -71 -28 -150
            -59 -175 -68 -39 -14 -117 -17 -615 -22 -547 -5 -570 -6 -573 -24 -2 -10 2
            -22 10 -27 7 -5 268 -9 580 -9 471 0 573 -2 600 -14 18 -8 85 -35 148 -59 63
            -25 145 -57 182 -71 81 -32 84 -32 122 -2 17 13 71 51 119 85 l88 61 994 0
            995 0 97 -47 c80 -38 109 -46 155 -47 63 -1 103 20 126 67 l13 27 653 0 c511
            0 656 -3 664 -12 5 -7 13 -29 17 -48 17 -85 109 -185 202 -220 134 -50 268 2
            324 125 55 120 -31 275 -151 275 -56 -1 -141 -48 -166 -94 -24 -43 -21 -76 7
            -76 12 0 24 13 33 35 38 91 169 100 220 15 23 -39 21 -115 -4 -156 -71 -114
            -253 -111 -353 7 -120 140 -67 350 108 428 82 36 209 20 305 -38 19 -11 42
            -24 50 -28 39 -17 118 -87 265 -232 169 -167 210 -199 315 -247 59 -26 75 -29
            170 -29 95 0 110 3 160 28 91 47 158 126 175 209 4 18 12 39 17 46 8 9 152 12
            658 12 l647 0 32 -40 c36 -45 90 -65 149 -54 20 4 79 27 130 51 l92 43 995 0
            994 0 122 -87 c135 -96 117 -92 229 -48 19 8 89 35 155 60 66 25 135 53 153
            61 27 12 129 14 597 14 310 0 570 3 579 6 9 3 16 17 16 30 l0 24 -564 0 -563
            0 -64 24 c-198 73 -262 98 -372 144 l-37 15 -72 -49 c-40 -27 -99 -68 -132
            -92 l-59 -42 -986 2 -986 3 -90 44 c-82 41 -97 45 -168 45 -83 1 -73 7 -139
            -73 -18 -21 -21 -21 -662 -21 -688 0 -656 -2 -670 50 -46 167 -207 279 -361
            251z"
          />
        </g>
      </svg>
    </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Stories, Authors, or Themes..."
            className="w-full px-10 py-2 border-3 border-deepnavy rounded-lg focus:outline-none text-deepnavy placeholder:text-deepnavy"
          />
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-deepnavy text-xl" />
        </div>

        <div className="flex gap-4">
          {/* Genres Dropdown */}
          <div className="relative">
            <select className="appearance-none px-4 py-2 border-3 border-deepnavy rounded-lg text-deepnavy pr-10 focus:outline-none">
              <option>All Genres</option>
              <option>Fiction</option>
              <option>Non-fiction</option>
              <option>Poetry</option>
            </select>
            <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-deepnavy pointer-events-none" />
          </div>

          {/* Sorting Dropdown */}
          <div className="relative">
            <select className="appearance-none px-4 py-2 border-3 border-deepnavy rounded-lg text-deepnavy pr-10 focus:outline-none">
              <option>Latest Creation</option>
              <option>Oldest First</option>
              <option>Most Popular</option>
            </select>
            <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-deepnavy pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Blog Cards */}
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-4xl p-6 flex flex-col md:flex-row items-start gap-6 border border-white"
          >
            {/* Image */}
            <img
              src={blog.img}
              alt={blog.title}
              className="w-40 h-40 object-cover border-2 border-deepnavy rounded"
            />

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-deepnavy">{blog.title}</h3>
              <p className="text-sm text-deepnavy mt-1">
                <span className="font-semibold">Author: </span>
                {blog.authors}
              </p>
              <p className="text-deepnavy/80 mt-3">{blog.excerpt}</p>

              {/* Tags + Button */}
              <div className="flex gap-4 mt-10">
                <span className="px-6 py-2 bg-[#1b3b64]  text-white  rounded-full text-sm border ">
                  Featured
                </span>

                <span className="px-6 py-2 bg-[#1b3b64] text-white  rounded-full text-sm border ">
                  Student Life
                </span>

                <Link
                  href={`/blogs/${blog.id}`}
                  className="ml-auto px-6 py-2 bg-deepnavy text-white rounded-md hover:bg-paleskyblue hover:text-deepnavy border border-deepnavy transition"
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
