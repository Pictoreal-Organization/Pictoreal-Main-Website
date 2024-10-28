import React from 'react'

const Contact = () => {
  return (
    <>
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-4xl font-bold mb-10 text-[#532c2b]">Contact Us</h2>
        <div className="grid md:grid-cols-12 gap-10 p-5">

          {/* Contact Information */}
          <div className="col-span-5 p-6 bg-white rounded-lg space-y-6">

            {/* location */}
            <div className="flex items-start space-x-4">
              <div className="bg-gray-200 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#532c2b]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2.25c4.97 0 9 4.03 9 9 0 6.5-9 12-9 12s-9-5.5-9-12c0-4.97 4.03-9 9-9z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#532c2b]">Location:</h3>
                <p className="text-[#6c4041]">
                  Pune Institute Of Computer Technology,
                  <br />
                  Survey No. 27, Near Trimurti Chowk, Dhankwadi
                  <br />
                  Pune, Maharashtra 411043
                </p>
              </div>
            </div>

            {/* email */}
            <div className="flex items-start space-x-4">
              <div className="bg-gray-200 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#532c2b]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v8.25A2.25 2.25 0 005.25 22.5h13.5A2.25 2.25 0 0021 19.25V12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#532c2b]">Email:</h3>
                <p className="text-[#6c4041]">pictoreal@pict.edu</p>
              </div>
            </div>

            {/* call */}
            <div className="flex items-start space-x-4">
              <div className="bg-gray-200 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#532c2b]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5.75A2.25 2.25 0 015.25 3.5h13.5A2.25 2.25 0 0121 5.75v12.5A2.25 2.25 0 0118.75 20.5H5.25A2.25 2.25 0 013 18.25V5.75z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#532c2b]">Call:</h3>
                <p className="text-[#6c4041]">+91 20 24371101</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='col-span-7 bg-white rounded-lg shadow-lg p-6'>
            <form className="space-y-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg"
              ></textarea>
              <button
                type="submit"
                className="bg-[#532c2b] text-white py-3 px-6 rounded-md hover:bg-[#452525] transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Contact