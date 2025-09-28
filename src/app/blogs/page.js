// "use client";
// import Link from "next/link";
// import { IoIosSearch } from "react-icons/io";
// import { IoIosArrowDown } from "react-icons/io";

// export default function BlogsPage() {
  
//   const blogs = [
    
//      {
//       id: "blog5",
//       title: "Dreams and Deadlines",
//       authors: "Harshit Vora, Omkar Desai",
//       img: "/blog/blog5-poster-img.png",
//       excerpt:
//         "Balancing academics and personal interests isn’t about sacrificing moments—it’s about weaving them together. A journey through 4 years of student life...",
//     },
//     {
//       id: "blog4",
//       title: "अरे बैगन! – चलिये, जानते है दक्खनी की दुनिया",
//       authors: "Ayan Pathan",
//       img: "/blog/blog-dakhni-poster.png",
//       excerpt:
//         "Dakhni isn’t just Hyderabadi slang—it’s a centuries-old language shaped by Hindi, Urdu, Marathi, Kannada, and Telugu influences. Let’s explore its roots...",
//     },
//     {
//       id: "blog3",
//       title: "Error 500 - The Flawed Beauty of Your Day",
//       authors: "Nehal Shivane, Sampada Tagalpallewar, Shruti Mone",
//       img: "/blog/blog3-poster-img.png",
//       excerpt:
//         "Life, just like programming, is full of unexpected errors. Instead of fearing mistakes, embrace them as opportunities to learn, grow, and redefine success...",
//     },
//    {
//       id: "blog2",
//       title: "Mysteries of Particle Physics",
//       authors: "Shrihari Kulkarni",
//       img: "/blog/blog2-poster-img.png",
//       excerpt:
//         "Step into the fascinating world of particle physics—a cosmic dance of quarks, leptons, and universal forces that shape the universe around us...",
//     },
//     {
//       id: "blog1",
//       title: "Uncanny Valley",
//       authors: "Prem Rahinj, SpondonNath",
//       img: "/blog/blog1-poster-img.jpg",
//       excerpt:
//         "Uncanny Valley is where AI gets eerily close to being human—so close, it’s unsettling. As AI becomes more lifelike, even small imperfections in appearance or behavior can trigger discomfort or unease in us.",
//     },
//   ];

//   return (
//     <div className="bg-paleskyblue min-h-screen px-4 md:p-6">
//       {/* Header */}
//       <h1 className="text-center font-bold text-[#111c33] font-heading text-2xl md:text-3xl mb-4">
//         BLOGS
//       </h1>

     

//       {/* Search + Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mt-10 justify-center w-full px-4 md:px-0 items-center mb-10">
//         <div className="relative w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="Search Stories, Authors, or Themes..."
//             className="w-full px-10 py-2 border-2 shadow-md bg-white border-deepnavy rounded-lg focus:outline-none text-deepnavy placeholder:text-deepnavy"
//           />
//           <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-deepnavy text-xl" />
//         </div>

//         <div className="flex gap-4">
//           {/* Genres Dropdown */}
//           <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
//             {/* Genre Dropdown */}
//             <div className="relative w-full shadow-md sm:w-auto">
//               <select className="appearance-none w-full sm:w-auto bg-white px-4 py-2 border-2 border-deepnavy rounded-lg text-deepnavy pr-10 focus:outline-none text-sm sm:text-base">
//                 <option>All Genres</option>
//                 <option>Fiction</option>
//                 <option>Non-fiction</option>
//                 <option>Poetry</option>
//               </select>
//               <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-deepnavy pointer-events-none" />
//             </div>

//             {/* Sorting Dropdown */}
//             <div className="relative shadow-md w-full sm:w-auto">
//               <select className="appearance-none w-full sm:w-auto px-4 py-2 border-2 bg-white border-deepnavy rounded-lg text-deepnavy pr-10 focus:outline-none text-sm sm:text-base">
//                 <option>Latest Creation</option>
//                 <option>Oldest First</option>
//                 <option>Most Popular</option>
//               </select>
//               <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-deepnavy pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Blog Cards */}
//       <div className=" rounded-4xl p-6 flex showdow-md flex-col md:flex-col mx-auto items-start gap-8 max-w-6xl ">
//         {blogs.map((blog) => (
//           <div
//             key={blog.id}
//             className="bg-white shadow-md rounded-4xl p-6 flex flex-col md:flex-row items-start gap-6 border border-white"
//           >
//             {/* Image */}
//             <img
//               src={blog.img}
//               alt={blog.title}
//               className="w-[140px] lg:w-[160px] aspect-[7/8] object-cover border-2 border-[#1a365d] rounded"
//             />

//             {/* Content */}
//             <div className="flex-1">
//               <h3 className="text-lg md:text-xl font-heading font-bold text-deepnavy text-center md:text-left">
//                 {blog.title}
//               </h3>
//               <p className="text-sm md:text-base font-body text-deepnavy mt-1 text-center md:text-left">
//                 <span className="font-semibold">Author: </span>
//                 {blog.authors}
//               </p>
//               <p className="text-deepnavy/80 font-body mt-3 text-center md:text-left">
//                 {blog.excerpt}
//               </p>

//               {/* Tags + Button */}
//               <div className="flex flex-row sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-6 items-center md:items-start sm:justify-start">
//                 <span className="px-4 py-1 bg-[#003366] text-white rounded-full text-xs md:text-sm border flex items-center justify-center">
//                   Featured
//                 </span>

//                 <span className="whitespace-nowrap  px-4 py-1 bg-[#003366] text-white rounded-full text-xs md:text-sm border flex items-center justify-center">
//                   Student Life
//                 </span>

//                 <Link
//                   href={`/blogs/${blog.id}`}
//                   className="ml-auto whitespace-nowrap px-4 py-2 duration-500 transition-transform transform hover:scale-120 bg-deepnavy text-white rounded-full hover:bg-[#003366] hover:text-white transition flex items-center justify-center text-xs md:text-sm border
//     max-sm:ml-0 max-sm:w-auto max-sm:px-auto  max-sm:py-1"
//                 >
//                   Read More
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







// import Link from 'next/link';
// import dbConnect from '../../lib/mongodb';
// import Blog from '../../models/Blog';

// export default async function BlogListPage() {
//   // Connect to MongoDB
//   await dbConnect();

//   // Fetch all published blogs
//   const blogs = await Blog.find({ draft: false }).sort({ publishedAt: -1 });

//   return (
//     <div className="p-8 bg-blue-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
//       {blogs.length === 0 && <p>No blogs found.</p>}
//       <div className="space-y-6">
//         {blogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-2xl shadow"
//           >
//             {/* Blog Image */}
//             <div className="w-40 h-40 flex-shrink-0">
//               <img
//                 src={blog.banner || '/default-banner.jpg'}
//                 alt={blog.title}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>

//             {/* Blog Content */}
//             <div className="flex-1">
//               <h2 className="text-2xl font-bold">{blog.title}</h2>
//               <p className="text-gray-700 mt-1">
//                 <span className="font-semibold">Author:</span>{' '}
//                 {blog.authors?.join(', ') || 'Unknown'}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 {blog.content.substring(0, 150)}...
//               </p>

//               {/* Tags */}
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {blog.tags?.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Read More Button */}
//               <div className="mt-4">
//                 <Link
//                   href={`/blogs/${blog._id}`}
//                   className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm"
//                 >
//                   Read More
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import Link from "next/link";
// import dbConnect from "../../lib/mongodb";
// import Blog from "../../models/Blog";

// export default async function BlogListPage() {
//   // Connect to MongoDB
//   await dbConnect();

//   // Fetch all published blogs
//   const blogs = await Blog.find({ status: "published" })
//     .sort({ publishedAt: -1 })
//     .lean();

//   return (
//     <div className="p-8 bg-blue-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

//       {blogs.length === 0 && <p>No blogs found.</p>}

//       <div className="space-y-6">
//         {blogs.map((blog) => (
//           <div
//             key={blog._id}
//             className={`flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-2xl shadow transition-all ${
//               blog.isFeaturedByPictoreal
//                 ? "border-2 border-green-500 animate-pulse"
//                 : "border border-gray-200"
//             }`}
//           >
//             {/* Blog Image */}
//             <div className="w-40 h-40 flex-shrink-0">
//               <img
//                 src={blog.banner || "/default-banner.jpg"}
//                 alt={blog.title}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>

//             {/* Blog Content */}
//             <div className="flex-1">
//               <h2 className="text-2xl font-bold">{blog.title}</h2>

//               <div className="text-sm text-gray-500 mt-1">
//                 In{" "}
//                 <span className="font-medium text-gray-700">Blogs</span> by{" "}
//                 <span className="font-medium text-gray-700">
//                   {blog.author || "Unknown"}
//                   {blog.coAuthors && blog.coAuthors.length > 0 && (
//                     <> & Co-authors: {blog.coAuthors.join(", ")}</>
//                   )}
//                 </span>
//                 {blog.copyEditors && blog.copyEditors.length > 0 && (
//                   <span className="text-xs text-gray-400 ml-2">
//                     (Editors: {blog.copyEditors.join(", ")})
//                   </span>
//                 )}
//               </div>

//               <p className="text-gray-600 mt-2">
//                 {typeof blog.content === "string"
//                   ? blog.content.substring(0, 150)
//                   : ""}
//                 ...
//               </p>

//               {/* Tags */}
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {blog.tags?.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Read More Button */}
//               <div className="mt-4">
//                 <Link
//                   href={`/blogs/${blog._id}`}
//                   className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm"
//                 >
//                   Read More
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import dbConnect from "../../lib/mongodb";
import Blog from "../../models/Blog";

export default async function BlogListPage() {
  await dbConnect();

  // Fetch published blogs sorted by newest first
  const blogs = await Blog.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .lean();

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">
          Write your blog here! <br className="md:hidden" />
          <span className="text-gray-600 text-lg font-normal">
            Sign up to get started
          </span>
        </h1>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Blog List */}
      {blogs.length === 0 && <p>No blogs found.</p>}

      <div className="space-y-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className={`flex flex-col md:flex-row items-start gap-4 border-b pb-6 ${
              blog.isFeaturedByPictoreal ? "border-2 border-green-500 rounded-lg p-4" : ""
            }`}
          >
            <div className="flex-1">
              {/* Author */}
              <div className="text-sm text-gray-500 mb-2">
                By{" "}
                <span className="font-medium text-gray-700">
                  {blog.isFeaturedByPictoreal
                    ? "Team Pictoreal"
                    : blog.authorDetails?.name || "Unknown Author"}
                </span>
                {!blog.isFeaturedByPictoreal && blog.copyEditors && blog.copyEditors.length > 0 && (
                  <span className="text-gray-500">
                    {" "}
                    (Editors: {blog.copyEditors.join(", ")})
                  </span>
                )}
              </div>

              {/* Title */}
              <Link href={`/blogs/${blog._id}`}>
                <h2 className="text-2xl font-bold hover:underline">{blog.title}</h2>
              </Link>

              {/* Description */}
              <p className="text-gray-600 mt-2">
                {blog.description?.substring(0, 140) || ""}
              </p>

              {/* Read more */}
              <div className="mt-3">
                <Link
                  href={`/blogs/${blog._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Read more
                </Link>
              </div>
            </div>

            {/* Banner */}
            {blog.banner && (
              <div className="w-full md:w-56 h-32 flex-shrink-0">
                <img
                  src={blog.banner}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


