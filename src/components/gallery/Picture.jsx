"use client"; // Ensure this directive is at the top of client components

import React, { useState, useEffect, useRef } from "react";

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
    <div className="fixed inset-0 !m-auto bg-firefly bg-opacity-90 flex items-center justify-center z-50 p-4 transition-opacity duration-500 ease-in-out">
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
    <div className="relative max-w-4xl mx-auto overflow-hidden my-8" ref={containerRef}>
      <div className="relative w-full h-auto flex items-center justify-center bg-white-200 rounded-lg shadow-lg">
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
                className="max-h-full object-contain border-2 border-[#d0b311] cursor-pointer rounded-lg transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                onClick={() => onImageClick(images)}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {/* Navigation Buttons */}
<div className="none">
  <button
    onClick={prevSlide}
    className="hidden md:block absolute top-1/2 left-4 md:left-40 transform -translate-y-1/2 bg-firefly text-[#d0b311] p-3 rounded-full hover:bg-[#9d2b60] transition-colors duration-300"
  >
    &#10094;
  </button>
  <button
    onClick={nextSlide}
    className="hidden md:block absolute top-1/2 right-4 md:right-40 transform -translate-y-1/2 bg-firefly text-[#d0b311] p-3 rounded-full hover:bg-[#9d2b60] transition-colors duration-300"
  >
    &#10095;
  </button>
</div>

      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array(images.length)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetTimer(); // Restart the timer when clicking an indicator
              }}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
                currentIndex === index ? "bg-[#d0b311]" : "bg-firefly"
              }`}
            />
          ))}
      </div>
    </div>
  );
};

// Main Picture Component
const Picture = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample image sets for each carousel
  const imageSets = [
    {
      images: [
        "/gallery/mre1.JPG",
        "/gallery/mre2.JPG",
        "/gallery/mre3.JPG",
        "/gallery/mre4.JPG",
        "/gallery/mre5.JPG",
      ],
      title: "Magazine Release Event",
      description:
        "The Magazine Release Event, the flagship event of Pictoreal, showcased a unique and captivating theme this year, Navras, symbolizing a magazine brimming with emotions. A classical dance performance depicting the nine rasas enhanced the event’s charm. The magazine was unveiled by dignitaries alongside student members of Pictoreal.The essence of Navras was truly felt as team members shared their experiences of magazine creation. Nostalgia peaked when the journey was relived through a heartfelt behind-the-scenes video. The magazine’s success was evident in the emotional involvement of all attendees, marking the fulfillment of a year-long dream.",
    },
    {
      images: [
        "/gallery/Manthan_1.JPG",
        "/gallery/Manthan_2.JPG",
        "/gallery/Manthan_3.JPG",
        "/gallery/Manthan_4.JPG",
        "/gallery/Manthan_5.JPG",
        "/gallery/Manthan_6.JPG",
      ],
      title: "Manthan",
      description:
        'The MANTHAN public speaking competition on September 14, 2023, allowed students to showcase their oratory skills on "Is brain drain a threat to innovation and development in home countries?". Through extempore storytelling and debate rounds, participants gained public speaking experience. First-year student Siddhant Vishnu won, receiving an Amazon gift card. MANTHAN helped students enhance communication skills while addressing a key socio-economic issue.',
    },
    {
      images: [
        "/gallery/Parichay_1.jpg",
        "/gallery/Parichay_2.JPG",
        "/gallery/Parichay_3.jpg",
        "/gallery/Parichay_4.jpg",
        "/gallery/Parichay_5.JPG",
        "/gallery/Parichay_6.jpg",
      ],
      title: "Parichay",
      description:
        "On October 16, 2023, Parichay introduced PICT's club Pictoreal to over 160 First Year students. Team heads introduced their teams, conducted activities and played games describing every team and its role in the harmonic operation of the club. The PictoSocial team performed a humorous skit on the ‘Blood Donation Drive.’ The event concluded with an open mic, showcasing talents in music and dance.",
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
        "On January 31st, 2024, Pictoreal and NSS hosted a successful Blood Donation Drive with Janakalyan Blood Bank. Dr. Kulkarni inaugurated the event, emphasizing community involvement and the importance of blood donation. A campus street play raised awareness, resulting in over 231 donors. With support from 50+ volunteers, the event ran smoothly. The closing ceremony celebrated the event’s success and the impact of community collaboration.",
    },
    {
      images: [
        "/gallery/Pictofest_1.jpg",
        "/gallery/Pictofest_2.jpg",
        "/gallery/pictofest_3.jpg",
        "/gallery/Pictofest_4.JPG",
        "/gallery/Pictofest_5.jpg",
        "/gallery/Pictofest_6.jpg",
        "/gallery/Pictofest_7.jpg",
        "/gallery/Pictofest_8.jpg",
        "/gallery/Pictofest_9.JPG",
        "/gallery/Pictofest_10.JPG",
        "/gallery/Pictofest_11.JPG",
        "/gallery/Pictofest_12.JPG",
        "/gallery/Pictofest_13.JPG",
      ],
      title: "PICTOFEST",
      description: `On February 23rd, PICTOREAL launched its first intercollegiate art festival, PICTOFEST. Over two days, participants engaged in events like Lost in Pieces, Trivia, Meme-making, Creative Writing, and workshops such as Play with Clay and Resin Art. "Taare Zameen Par," an open-air live painting event, received enthusiastic responses. The art exhibition PICS-O-REEL displayed 600+ entries, attracting a large audience from Pune colleges. It concluded with a closing ceremony awarding prizes for all competitions.`,
    },
    {
      images: [
        "/gallery/BE_1.JPG",
        "/gallery/BE_2.JPG",
        "/gallery/BE_3.JPG",
        "/gallery/BE_4.JPG",
        "/gallery/BE_5.JPG",
        "/gallery/BE_6.JPG",
        "/gallery/BE_7.JPG",
        "/gallery/BE_8.JPG",
        "/gallery/BE_9.JPG",
      ],
      title: "BE Photoshoot",
      description:
        "The BE photoshoot by Pictoreal on April 13, 2024, captured final moments for the BEs with class photos and staff portraits. Held in front of the A1 Building and Lawn, the event included interactive activities, fostering bonding among students. It concluded with a ramp walk where BEs flaunted their sarees and suits, adding style and flair.",
    },
    {
      images: [
        "/gallery/interview1.JPG",
        "/gallery/interview2.JPG",
        "/gallery/interview3.JPG",
        "/gallery/interview4.JPG",
        "/gallery/interview5.JPG",
      ],
      title: "Interviews",
      description:
        "This year at Pictoreal, we interviewed remarkable individuals: tech enthusiast Pratik Ratadiya, Sujata Mastani visionary Sachin Kondhalkar, wildlife conservation hero Kulbhushan Singh Suryawanshi, and Guinness World Record cyclist Preeti Maske. Each conversation offered invaluable insights, enriching our journey and providing lessons from diverse fields, including technology, culinary arts, conservation, and extreme sports.",
    },
    {
      images: [
        "/gallery/Career_1.JPG",
        "/gallery/Career_2.JPG",
        "/gallery/Career_3.JPG",
        "/gallery/Career_4.JPG",
        "/gallery/Career_5.JPG",
        "/gallery/Career_6.jpg",
        "/gallery/Career_7.jpg",
      ],
      title: "Career Guidance",
      description:
        "On March 15, 2024, a career guidance session was conducted at Pune Municipality's Madhyamik Vidyalaya, Katraj. It aimed to enlighten 8th and 9th grade students about career pathways after completing the 10th grade. The session encouraged students to explore their dreams and various career options, providing guidance on steps to achieve their goals. An interactive activity prompted students to write down their aspirations, fostering engagement and reflection.",
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
        "The visit to Akshar Paaul NGO on January 14, 2024, was an unforgettable experience. With 30 passionate volunteers, children explored their creativity through handprint bookmarks and origami. On the occasion of Republic Day, inspiring stories of freedom fighters were shared, along with engaging general knowledge questions. But it was the lively song and dance that truly enchanted everyone, leaving hearts full and spirits lifted.",
    },
    {
      images: [
        "/gallery/d1.jpg",
        "/gallery/d2.jpg",
        "/gallery/d3.jpg",
        "/gallery/d4.jpg",
        "/gallery/d5.jpg",
        "/gallery/d6.jpg",
        "/gallery/d7.jpg",
        "/gallery/d8.jpg",
        "/gallery/d9.jpg",
      ],
      title: "Donation Drive",
      description:
        "Pictoreal organized its annual Donation Drive for Vol '24, reflecting its commitment to serving the underprivileged. The drive received generous contributions from students and staff, including monetary donations, clothes, footwear, bags, and books. A closing ceremony was held to distribute the donations among three beneficiary NGOs, amplifying the impact of Pictoreal's generosity.",
    },
    {
      images: [
        "/gallery/Visit_1.jpg",
        "/gallery/Visit_2.jpg",
        "/gallery/Visit_3.jpg",
        "/gallery/Visit_4.jpg",
      ],
      title: "Pictosocial Visit",
      description:
        "The visit to Janseva Orphanage on November 5, 2023, saw the enthusiastic participation of 40 dedicated volunteers. Our goal was not just to bring smiles to the children's faces, but also to ignite their creativity, promote teamwork, and instill an appreciation for cultural traditions. Through engaging activities like diya painting, killa making, and lantern crafting, we created a memorable experience for both volunteers and children alike, fostering a sense of joy and community spirit.",
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
        "Amche Bappa commenced on September 19th, 2023, spanned for 10 days featuring contests where participants displayed creativity and devotion to Ganpati Bappa. They uploaded photos of home decorations and showcased mandal art, enriching community festivities. Reels and videos added dynamic storytelling to express devotion. Overall, Amche Bappa celebrated Ganesh Chaturthi with enthusiasm, creativity, and community spirit.",
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
    <div class="bg-mist-texture">
    <div className="space-y-8 p-4 mb-10">
      <h2 className="text-5xl text-firefly font-bold text-center mb-10">
            GALLERY
          </h2>
      {imageSets.map((set, i) => (
        <div
          key={i}
          className="max-w-4xl mx-auto ring-2 ring-firefly bg-[#FFFFFF] p-6 rounded-lg"
        >
          {/* Heading */}
          
          <h2 className="text-3xl text-firefly font-bold text-center mb-4">
            {set.title}
          </h2>
          
          {/* Carousel */}
          <Carousel images={set.images} onImageClick={handleImageClick} />

          {/* Description */}
          <div className="flex justify-center">
  <p className="text-justify text-[#141414] mb-4 max-w-3xl">
    {set.description}
  </p>
</div>

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
);
};

export default Picture;
