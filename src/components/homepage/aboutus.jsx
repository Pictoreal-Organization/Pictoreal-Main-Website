import React, { useState } from 'react'
import Image from 'next/image'

const AboutUs = () => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <section>
      <div className='bg-mist-texture grid grid-cols-12 gap-4'>
        {/* Left margin (1 column) */}
        <div className="col-span-1"></div>

        {/* Main content area */}
        <div className='col-span-10 flex flex-wrap pt-14'>
          {/* Logo and title section */}
          <div className='w-full lg:w-5/12'>
            <h2 className='text-firefly text-4xl text-center font-bold p-2.5 mt-0 mb-7.5'>ABOUT US</h2>
            <div className="phnx flex justify-center mx-auto pt-14">
              <div className="flip-container perspective">
                <div className={`flip-inner ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front side (Volume 26 logo) */}
                  <div className="flip-front">
                    <Image
                      src="/icon.png"
                      alt="Volume 26 logo"
                      width={325}
                      height={325}
                    />
                  </div>
                  {/* Back side (Volume 27 logo) */}
                  <div className="flip-back">
                    <Image
                      src="/V27_FINAL_LOGO.png"
                      alt="Volume 27 logo"
                      width={325}
                      height={325}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg bg-firefly text-mist px-4 py-2 rounded hover:bg-opacity-80"
              >
                Reveal Logo
              </button>
            </div>
          </div>

          {/* Content section */}
          <div className='w-full lg:w-7/12 text-justify'>
            <p className='mb-4 mt-4 font-sans font-semibold text-twilight'>
              A magazine is an experiment and it represents a new focus, a new ratio between commerce and intellect.
            </p>
            <p className='mb-4 font-sans font-semibold text-twilight'>
              Pictoreal is one of the distinguished non-technical clubs at PICT. At Pictoreal, our mission is to create and publish the annual magazine of PICT with unique themes that showcase the talents of PICT. Pictoreal organizes several enthusiastic events throughout the year to boost creative minds. The club always promotes one's skills in literature, design, and photography. We support individuals to build practical skills like event management, public speaking, teamwork, and much more. To enhance one's productive skills, we host multiple events like Pics-o-Reel, an annual art and photography exhibition-cum-competition where students can showcase their art pieces. This year, we introduced a new event, Pictofest, which included Pics-o-Reel and various other workshops such as mastering Blender, pottery, and competitions for creative writing and meme making. To promote public speaking skills, we organize Manthan, featuring mini-events such as extempore, debates, group discussions, etc. Pictosocial, a subgroup of Pictoreal believes the culture in
              PICT to lose ourselves in the service of others until we discover our own lives and our happiness. To
              promote the same, we organize events like Tree plantation drives, blood donation and Monetary donation
              drives, and Old-age home or Orphanage visits. To guide and communicate with students in remote areas, we
              organize Career counselling sessions. Here at Pictoreal, we try to step forward, reach out and help the
              students in PICT unleash their creative side.
            </p>
            <p className='mb-4 text-twilight font-semibold'>
              Our members in Pictoreal always live by one motto-
            </p>
            <p className='font-bold italic text-firefly'>
              &lsquo;May Thoughts, Colours, and Words prevail!&rsquo;
            </p>
          </div>
        </div>

        {/* Right margin (1 column) */}
        <div className="col-span-1"></div>
      </div>

      {/* Custom CSS for flipping animation */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }

        .flip-container {
          width: 325px;
          height: 325px;
        }

        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s;
        }

        .flip-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-front,
        .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .flip-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}

export default AboutUs
