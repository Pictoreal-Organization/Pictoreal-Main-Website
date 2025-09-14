"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Carousel from "./Carousel";
import Modal from "./Modal";
import ExpandedImage from "./ExpandedImage";
import { imageSets } from "./data";
import Image from "next/image";


const color1 = "#DCF1FF";
const color2 = "#A8DCEC";
const color3 = "#111C33";

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


    const handleImageClick = (images) => {
        setCarouselImages(images);
        setModalOpen(true);
    };

    const handleGridImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>
            <div className={` text-[${color3}] bg-[${color1}]`}>
                <div className={`space-y-80 mb-10`}>
                    <p className="font-heading text-3xl text-[#001730] md:text-5xl mt-6 font-bold text-center sm:-mb-6 -mb-1">
                        GALLERY
                    </p>
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
                                <div className={`flex flex-col lg:flex-row mt-10 lg:pt-0`}>
                                    <p className="lg:hidden font-heading text-xl text-[#001730] md:text-3xl font-bold text-center mb-4">
                                        {set.title}
                                    </p>
                                    <div className="lg:max-w-[40%] lg:pl-10">
                                        <Carousel images={set.images} onImageClick={handleImageClick} />
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-full lg:p-10 lg:px-10 md:pt-5 ">
                                        <h2 className="hidden lg:block font-heading text-3xl font-bold text-center mb-4">
                                            {set.title}
                                        </h2>
                                        <div className="font-body  md:text-xl sm:text-sm flex justify-center">
                                            <p className="text-justify  mb-4 max-w-3xl">
                                                {set.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {i !== imageSets.length - 1 && (
                                <div className={` relative w-full h-15 bg-transparent -mb-1`}>
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
        </>
    );
};

export default Picture;
