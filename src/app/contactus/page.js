import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";

const ContactUs = () => {
    return (
      <>
        <div className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-[#532c2b]">Contact Us</h2>
            <div className="grid gap-6 sm:gap-10 md:grid-cols-12 p-4">
  
              {/* Contact Information */}
              <div className="col-span-12 md:col-span-5 bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* location */}
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-200 rounded-full p-3 sm:p-4">
                    <FaLocationDot className="text-[#532c2b] text-xl sm:text-2xl"/>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#532c2b]">Location:</h3>
                    <p className="text-sm sm:text-base text-[#6c4041]">
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
                  <div className="bg-gray-200 rounded-full p-3 sm:p-4">
                    <MdEmail className="text-[#532c2b] text-xl sm:text-2xl"/>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#532c2b]">Email:</h3>
                    <p className="text-sm sm:text-base text-[#6c4041]">pictoreal@pict.edu</p>
                  </div>
                </div>
  
                {/* call */}
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-200 rounded-full p-3 sm:p-4">
                    <IoIosCall className="text-[#532c2b] text-xl sm:text-2xl"/>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#532c2b]">Call:</h3>
                    <p className="text-sm sm:text-base text-[#6c4041]">+91 20 24371101</p>
                  </div>
                </div>
              </div>
  
              {/* Contact Form */}
              <div className="col-span-12 md:col-span-7 bg-white rounded-lg shadow-md p-6 space-y-6">
                <form className="space-y-4">
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#532c2b]"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#532c2b]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#532c2b]"
                  />
                  <textarea
                    placeholder="Message"
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#532c2b]"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#532c2b] text-white py-3 px-6 rounded-md hover:bg-[#452525] transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
  
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default ContactUs;
