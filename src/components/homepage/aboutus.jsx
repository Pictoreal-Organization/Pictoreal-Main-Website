import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-serif flex justify-center items-center py-16 px-4"> {/* Added vertical padding */}
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-12">
          {/* Left Section - Image */}
          <div className="flex-shrink-0 mt-30 lg:w-1/2 flex "> {/* Align image to start */}
            <div className="relative overflow-hidden rounded-lg shadow-lg w-full max-w-md lg:max-w-none"> {/* Added max-w */}
              <img
                src="./image.png" // Placeholder, replace with {groupPhoto}
                alt="Group of students from Pictoreal"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Section - About Us Content */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left relative"> {/* Added relative for absolute positioning */}
            {/* "About Us" heading */}
            <h1 className="text-5xl font-light text-gray-800 absolute top-0 lg:left-1/2 lg:-translate-x-1/2 z-10 w-full lg:w-auto text-center">About Us</h1> {/* Absolute positioning */}

            <div className="flex flex-col items-center lg:items-start space-y-8 mt-08 lg:mt-32"> {/* Increased top margin for content */}
              {/* Logo Section */}
              <div className="flex-shrink-0 mb-4 self-center"> {/* Ensure logo starts at top */}
                <div className="relative w-60 h-60 rounded-full border border-gray-300 flex flex-col items-center justify-center overflow-hidden ml-10"> {/* Added overflow-hidden */}
                  <img
                    src="./V27_FINAL_LOGO.png"
                    alt="Pictoreal logo"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              </div>

              {/* Text Description */}
              <p className="text-sm text-gray-700 leading-relaxed max-w-md text-center">
                We are Pictoreal: a community that publishes a magazine and serves our community. Join us to write the story and be the change on campus this year.
              </p>

              {/* Stats Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 justify-center lg:justify-start w-full"> {/* Responsive buttons */}
                <div className="bg-blue-200 text-blue-800 rounded-lg px-6 py-2 text-sm font-semibold flex flex-col items-center justify-center min-w-[150px] h-16 shadow-md"> {/* Adjusted size and min-width */}
                  <span className="text-xl font-bold">35+</span> {/* Larger font for 35+ */}
                  <span className="text-xs">Years since inception</span>
                </div>
                <div className="bg-gray-300 rounded-lg w-full sm:w-28 h-16 shadow-md"></div> {/* Consistent height and shadow */}
                <div className="bg-gray-300 rounded-lg w-full sm:w-28 h-16 shadow-md"></div> {/* Consistent height and shadow */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;