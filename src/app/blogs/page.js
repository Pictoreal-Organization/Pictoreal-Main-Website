"use client";
import Link from "next/link";

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
      img: "/blog/blog2-poster-img.png",
      excerpt:
        "Step into the fascinating world of particle physics—a cosmic dance of quarks, leptons, and universal forces that shape the universe around us...",
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
      id: "dakhni",
      title: "अरे बैगन! – चलिये, जानते है दक्खनी की दुनिया",
      authors: "Ayan Pathan",
      img: "/blogs/blog-dakhni-poster.png",
      excerpt:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a nobis est quisquam fugiat animi, itaque provident facere, nam, excepturi in accusamus obcaecati hic? Laborum delectus impedit maiores sint perspiciatis atque optio. Excepturi labore ducimus laboriosam aut modi totam possimus. Dicta fugit perferendis ab beatae libero dolorem voluptas animi aliquid labore consequatur numquam, non incidunt soluta quasi debitis necessitatibus odio velit. Autem omnis facilis beatae error pariatur corporis",
    },
  ];

  return (
    <div className="bg-paleskyblue min-h-screen p-6">
      {/* Header */}
      <h2 className="text-center font-bold text-3xl mb-4 text-deepnavy">BLOGS</h2>
      <div className="flex items-center justify-center mb-6">
        <div className="w-32 h-[2px] bg-deepnavy"></div>
        <span className="mx-2 text-deepnavy">✦</span>
        <div className="w-32 h-[2px] bg-deepnavy"></div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
        <input
          type="text"
          placeholder="search stories , authors , or themes ..."
          className="w-full md:w-1/3 px-4 py-2 border border-deepnavy rounded-lg focus:outline-none text-deepnavy placeholder:text-deepnavy"
        />
        <select className="px-4 py-2 border border-deepnavy rounded-lg text-deepnavy">
          <option>All Genres</option>
          <option>Fiction</option>
          <option>Non-fiction</option>
          <option>Poetry</option>
        </select>
        <select className="px-4 py-2 border border-deepnavy rounded-lg text-deepnavy">
          <option>Latest Creation</option>
          <option>Oldest First</option>
          <option>Most Popular</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-4xl p-12 flex flex-col md:flex-row items-start gap-6 border border-white"
          >
            {/* Image */}
            <img
              src={blog.img}
              alt={blog.title}
              className="w-70 h-70 mt-9 object-cover border-2 border-deepnavy rounded"
            />

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-deepnavy">{blog.title}</h3>
              <p className="text-sm text-deepnavy mt-5">
                <span className="font-semibold">Author: </span>
                {blog.authors}
              </p>
              <p className="text-deepnavy/80 mt-5">{blog.excerpt}</p>

              {/* Tags + Button */}
              <div className="flex flex-wrap gap-4 mt-12 items-center">
                {/* Tags */}
                <span className="px-3 py-1 bg-deepnavy text-white rounded-full text-sm border border-deepnavy">
                  Featured
                </span>

                <span className="px-3 py-1 bg-deepnavy text-white rounded-full text-sm border border-deepnavy">
                  Student Life
                </span>

                {/* Read More Button */}
                <Link
                  href={`/blogs/${blog.id}`}
                  className="ml-auto px-4 py-2 bg-deepnavy text-white rounded-full text-base border border-deepnavy hover:bg-paleskyblue hover:text-deepnavy transition"
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