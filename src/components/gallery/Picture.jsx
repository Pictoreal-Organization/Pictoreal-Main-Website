"use client"; // Ensure this directive is at the top of client components

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

// const color1="[#87CEFA]/30";
// const color2="[#000080]/10";
// const color1="#87CEFA";
// const color2="#000080";
const color1 = "#DCF1FF";
const color2 = "#A8DCEC";


// Expanded Image View Component
const ExpandedImage = ({ image, onClose }) => (
  <div className="fixed inset-0 !m-auto bg-firefly bg-opacity-90 flex items-center justify-center z-50 p-4 transition-opacity duration-500 ease-in-out">
    <img
      src={image}
      alt="Expanded"
      className="max-w-full max-h-full border-[#d0b311] border-2 object-contain transition-transform duration-300 ease-in-out transform hover:scale-105"
    />
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors duration-300"
    >
      &#10005;
    </button>
  </div>
);

// Modal Component (Grid View)
const Modal = ({ isOpen, onClose, images, onImageClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 !m-auto bg-deepnavy bg-opacity-90 flex items-center justify-center z-50 p-4 transition-opacity duration-500 ease-in-out">
      <div className="relative bg-black p-6 rounded-lg max-w-5xl w-full max-h-screen overflow-y-auto shadow-lg transition-transform duration-300 transform scale-95 hover:scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#141414] z-50 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors duration-300"
        >
          &#10005;
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="w-full h-64 object-cover border-[#d0b311] border-2 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => onImageClick(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Carousel Component
const Carousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTwoImages, setIsTwoImages] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const timerRef = useRef(null); // Ref to store the timer

  // Function to reset and start a new timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  // Auto-slide with reset on component mount and updates
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  // Reset timer on manual navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetTimer(); // Restart the timer when navigating
  };
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    resetTimer(); // Restart the timer when navigating
  };

  return (
    <div className="relative lg:max-w-[30%] max-w-[85%]  mx-auto overflow-hidden my-2 lg:my-8 z-20" ref={containerRef}>
      <div className="relative w-full h-auto flex items-center justify-center bg-white-200 rounded-lg shadow-lg"
      >
        {/* Image Slider */}
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-80 flex items-center justify-center w-full"
            >
              <img
                ref={index === 0 ? imageRef : null}
                src={image}
                alt={`Slide ${index}`}
                className="max-h-full object-cont  border-2 border-firefly cursor-pointer rounded-lg transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                onClick={() => onImageClick(images)}
              />
            </div>
          ))}
        </div>

        {/* <div className=""> */}
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className=" md:block absolute top-1/2  left-0 md:left-0 transform -translate-y-1/2 bg-firefly text-[#d0b311] bg-deepnavy p-3 rounded-full hover:bg-[#00426b] transition-colors duration-300 z-10"
        >
          &#10094;
        </button>
        {/* Navigation Buttons */}
        <button
          onClick={nextSlide}
          className=" md:block absolute top-1/2 right-0 md:right-0 transform -translate-y-1/2 bg-firefly text-[#d0b311] bg-deepnavy p-3 rounded-full hover:bg-[#00426b] transition-colors duration-300"
        >
          &#10095;
        </button>
        {/* </div> */}

      </div>

      {/* Indicators */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array(images.length)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetTimer(); // Restart the timer when clicking an indicator
              }}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all ${currentIndex === index ? "bg-mist" : "bg-firefly"
                }`}
            />
          ))}
      </div> */}
    </div>
  );
};

// Main Picture Component
const Picture = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    if (eventId) {
      const element = document.getElementById(eventId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [eventId]);


  // Sample image sets for each carousel
  const imageSets = [
    {
      images: [
        "/gallery/mre1.jpg",
        "/gallery/mre2.jpg",
        "/gallery/mre3.jpg",
        "/gallery/mre4.jpg",
        "/gallery/mre5.jpg",
      ],
      title: "Magazine Release Event",
      description:
        "The Magazine Release Event, the flagship event of Pictoreal, showcased a unique and captivating theme this year, Navras, symbolizing a magazine brimming with emotions. A classical dance performance depicting the nine rasas enhanced the event’s charm. The magazine was unveiled by dignitaries alongside student members of Pictoreal.The essence of Navras was truly felt as team members shared their experiences of magazine creation. Nostalgia peaked when the journey was relived through a heartfelt behind-the-scenes video. The magazine’s success was evident in the emotional involvement of all attendees, marking the fulfillment of a year-long dream.",
    },
    {
      images: [
        "/gallery/Manthan_1.jpg",
        "/gallery/Manthan_2.jpg",
        "/gallery/Manthan_3.jpg",
        "/gallery/Manthan_4.jpg",
        "/gallery/Manthan_5.jpg",
        "/gallery/Manthan_6.jpg",
      ],
      title: "Manthan",
      description:
        'The MANTHAN public speaking competition on February 18, 2025, allowed students to showcase their oratory skills on "Is brain drain a threat to innovation and development in home countries?". Through extempore storytelling and debate rounds, participants gained public speaking experience. First-year student Siddhant Vishnu won, receiving an Amazon gift card. MANTHAN helped students enhance communication skills while addressing a key socio-economic issue.',
    },
    {
      images: [
        "/gallery/Parichay_1.jpg",
        "/gallery/Parichay_2.jpg",
        "/gallery/Parichay_3.jpg",
        "/gallery/Parichay_4.jpg",
        "/gallery/Parichay_5.jpg",
        "/gallery/Parichay_6.jpg",
      ],
      title: "Parichay",
      description:
        "On September 27th, 2024, Parichay introduced PICT's club Pictoreal to over 160 First Year students. Team heads introduced their teams, conducted activities and played games describing every team and its role in the harmonic operation of the club. The PictoSocial team performed a humorous skit on the ‘Blood Donation Drive.’ The event concluded with an open mic, showcasing talents in music and dance.",
    },
    {
      images: [
        "/gallery/BDD_1.jpg",
        "/gallery/BDD_2.jpg",
        "/gallery/BDD_3.jpg",
        "/gallery/BDD_4.jpg",
        "/gallery/BDD_5.jpg",
        "/gallery/BDD_6.jpg",
        "/gallery/BDD_7.jpg",
      ],
      title: "Blood Donation Drive",
      description:
        "On March 4th, 2025, Pictoreal and NSS hosted a successful Blood Donation Drive with Janakalyan Blood Bank. Dr. Kulkarni inaugurated the event, emphasizing community involvement and the importance of blood donation. A campus street play raised awareness, resulting in over 231 donors. With support from 50+ volunteers, the event ran smoothly. The closing ceremony celebrated the event’s success and the impact of community collaboration.",
    },
    {
      images: [
        "/gallery/Pictofest_1.jpg",
        "/gallery/Pictofest_2.jpg",
        "/gallery/Pictofest_3.jpg",
        "/gallery/Pictofest_4.jpg",
        "/gallery/Pictofest_5.jpg",
        "/gallery/Pictofest_6.jpg",
        "/gallery/Pictofest_7.jpg",
        "/gallery/Pictofest_8.jpg",
        "/gallery/Pictofest_9.jpg",
        "/gallery/Pictofest_10.jpg",
        "/gallery/Pictofest_11.jpg",
        "/gallery/Pictofest_12.jpg",
        "/gallery/Pictofest_13.jpg",
      ],
      title: "PICTOFEST",
      description: `On February 20th, PICTOREAL hosted its first intercollegiate art festival, PICTOFEST 2025, under the theme “Beachy Vibes.” Over two days, vibrant decor and engaging activities brought the spirit of the sea to life. Events like Manthan (public speaking), Coastal Crimes (mystery-solving), Horizon Hunt (treasure hunt), and Figma Wave (online design contest) saw enthusiastic participation. Hands-on workshops such as Play with Clay, Texture Art, and Craft Your Moon drew 150+ creatives. The PICS-O-REEL exhibition showcased 800+ artworks and drew large crowds across Pune. The festival ended with a grand closing ceremony honoring winners across all events.`,
    },
    {
      images: [
        "/gallery/BE_1.jpg",
        "/gallery/BE_2.jpg",
        "/gallery/BE_3.jpg",
        "/gallery/BE_4.jpg",
        "/gallery/BE_5.jpg",
        "/gallery/BE_6.jpg",
        "/gallery/BE_7.jpg",
        "/gallery/BE_8.jpg",
        "/gallery/BE_9.jpg",
      ],
      title: "BE Photoshoot",
      description:
        "The BE photoshoot by Pictoreal on April 26th, 2025, captured final moments for the BEs with class photos and staff portraits. Held in front of the A1 Building and Lawn, the event included interactive activities, fostering bonding among students. It concluded with a ramp walk where BEs flaunted their sarees and suits, adding style and flair.",
    },
    {
      images: [
        "/gallery/Int1.jpg",
        "/gallery/Int2.jpg",
        "/gallery/Int3.jpg",
        "/gallery/Int4.jpg",
        "/gallery/Int5.jpg",
      ],
      title: "Interviews",
      description:
        "This year at Pictoreal, we interviewed remarkable individuals: tech enthusiast Pratik Ratadiya, Sujata Mastani visionary Sachin Kondhalkar, wildlife conservation hero Kulbhushan Singh Suryawanshi, and Guinness World Record cyclist Preeti Maske. Each conversation offered invaluable insights, enriching our journey and providing lessons from diverse fields, including technology, culinary arts, conservation, and extreme sports.",
    },
    {
      images: [
        "/gallery/Career_1.jpg",
        "/gallery/Career_2.jpg",
        "/gallery/Career_3.jpg",
        "/gallery/Career_4.jpg",
        "/gallery/Career_5.jpg",
        "/gallery/Career_6.jpg",
        "/gallery/Career_7.jpg",
      ],
      title: "Career Guidance",
      description:
        "On October 22nd, 2024, a career guidance session was conducted at Pune Municipality's Madhyamik Vidyalaya, Katraj. It aimed to enlighten 8th and 9th grade students about career pathways after completing the 10th grade. The session encouraged students to explore their dreams and various career options, providing guidance on steps to achieve their goals. An interactive activity prompted students to write down their aspirations, fostering engagement and reflection.",
    },
    {
      images: [
        "/gallery/OLD_1.jpg",
        "/gallery/OLD_2.jpg",
        "/gallery/OLD_3.jpg",
        "/gallery/OLD_4.jpg",
        "/gallery/OLD_5.jpg",
        "/gallery/OLD_6.jpg",
        "/gallery/OLD_7.jpg",
      ],
      title: "Old Age Home Visit",
      description:
        "The visit to Akshar Paaul NGO on April 13th, 2025, was an unforgettable experience. With 30 passionate volunteers, children explored their creativity through handprint bookmarks and origami. On the occasion of Republic Day, inspiring stories of freedom fighters were shared, along with engaging general knowledge questions. But it was the lively song and dance that truly enchanted everyone, leaving hearts full and spirits lifted.",
    },
    {
      images: [
        "/gallery/Picto_Plants1.jpg",
        "/gallery/Picto_Plants2.jpg",
        "/gallery/Picto_Plants3.jpg",
        "/gallery/Picto_Plants4.jpg",
      ],
      title: "Picto Plants",
      description:
        "Picto Plants was a sapling plantation drive organized by Pictoreal for Vol '27, reflecting the club's commitment to environmental sustainability and community service. Students and staff participated enthusiastically, planting saplings and contributing to a greener campus. The drive aimed to raise awareness about the importance of trees and environmental conservation, and concluded with a ceremony celebrating the collective effort to make a positive ecological impact.",
    },
    {
      images: [
        "/gallery/Visit_1.jpg",
        "/gallery/Visit_2.jpg",
        "/gallery/Visit_3.jpg",
        "/gallery/Visit_4.jpg",
      ],
      title: "Orphanage Visit",
      description:
        "The visit to Janseva Orphanage on December 22nd, 2024, saw the enthusiastic participation of 40 dedicated volunteers. Our goal was not just to bring smiles to the children's faces, but also to ignite their creativity, promote teamwork, and instill an appreciation for cultural traditions. Through engaging activities like diya painting, killa making, and lantern crafting, we created a memorable experience for both volunteers and children alike, fostering a sense of joy and community spirit.",
    },
    {
      images: [
        "/gallery/Clean_1.jpg",
        "/gallery/Clean_2.jpg",
        "/gallery/Clean_3.jpg",
        "/gallery/Clean_4.jpg",
        "/gallery/Clean_5.jpg",
      ],
      title: "Cleanliness Drive",
      description:
        "On April 20th, a cleanliness drive was conducted at ARAI Hills, Pune. The primary objective was restoring the pristine beauty and well-being of the local ecosystem. Three groups of volunteers equipped with garbage bags and hand gloves for safety, commenced the activity at 9:00 AM. After two hours of rigourous scouting, volunteers managed to collected 12+ bags worth of environmentally hazardous waste. Drive halted at 11:00 AM due to intense heat. All waste was then disposed of at the PMC garbage disposal area on the hill.",
    },
    {
      images: [
        "/gallery/bappa1.jpg",
        "/gallery/bappa2.jpg",
        "/gallery/bappa3.jpg",
        "/gallery/bappa4.jpg",
      ],
      title: "Amche Bappa",
      description:
        "Amche Bappa, spanned for 10 days featuring contests where participants displayed creativity and devotion to Ganpati Bappa. They uploaded photos of home decorations and showcased mandal art, enriching community festivities. Reels and videos added dynamic storytelling to express devotion. Overall, Amche Bappa celebrated Ganesh Chaturthi with enthusiasm, creativity, and community spirit.",
    },
  ];

  const handleImageClick = (images) => {
    setCarouselImages(images);
    setModalOpen(true);
  };

  const handleGridImageClick = (image) => {
    setSelectedImage(image); // Set the selected image for the expanded view
  };

  return (
    <>
      <div className={` bg-[${color1}]`}>
        <div className={`space-y-80 lg:px-10 md:px-5 mb-10`}>
          <h2 className="font-heading text-5xl text-firefly font-bold text-center mb-10">
            GALLERY
          </h2>
          {imageSets.map((set, i) => (
            <div
              key={i}
              className="m-0"
              style={{ backgroundColor: i % 2 === 0 ? color1 : color2 }}
            >

              <div
                id={set.title.toLowerCase().replace(/\s+/g, "-")}
                style={{ backgroundColor: i % 2 === 0 ? color1 : color2 }}
                className="flex flex-col max-w-full mx-auto lg:p-6 px-4 rounded-lg"
              >
                <div className={`flex flex-col lg:flex-row`}>
                  {/* Carousel */}
                  <Carousel images={set.images} onImageClick={handleImageClick} />

                  <div className="flex flex-col items-center justify-center w-full lg:p-10 lg:px-20   ">

                    {/* Heading */}
                    <h2 className="font-heading text-3xl text-firefly font-bold text-center mb-4">
                      {set.title}
                    </h2>
                    {/* Description */}
                    <div className="font-body  md:text-xl sm:text-sm flex justify-center">
                      <p className="text-justify text-[#141414] mb-4 max-w-3xl">
                        {set.description}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {(i !== imageSets.length - 1) && (
                <div className={` relative w-full h-15 bg-transparent -mg-1`}>
                  <svg
                    className="absolute bottom-0 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill={i % 2 === 0 ? color2 : color1}
                      fillOpacity="1"
                      d="M0,290 Q200,250 720,290 T1440,290 V320 H0 Z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          ))}

          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            images={carouselImages}
            onImageClick={handleGridImageClick}
          />

          {selectedImage && (
            <ExpandedImage
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}

        </div>
      </div>

      {/*       
      <div className=" relative w-full h-25 bg-transparent">
        <svg
          className="absolute bottom-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="red"
            fillOpacity="1"
            d="M0,290 Q200,250 720,290 T1440,290 V320 H0 Z"
          ></path>
        </svg>
      </div> */}
      {/* 
      <div className={` relative w-full h-15 bg-transparent `}>
        <svg
          className="absolute bottom-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill={`red`}
            fillOpacity="1"
            d="M0,290 Q200,250 720,290 T1440,290 V320 H0 Z"
          ></path>
        </svg>
      </div> */}
      {/* <div className="h-20 bg-blue-700"></div> */}


    </>

  );
};

export default Picture;
