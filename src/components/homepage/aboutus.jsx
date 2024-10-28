import React from 'react'
import Image from 'next/image'

const AboutUs = () => {
  return (
    <section>
      <div className='grid grid-cols-12 gap-4'>
        {/* Left margin (1 column) */}
        <div className="col-span-1"></div>
        <div className='col-span-10 flex flex-wrap  pt-14'>
            {/* div for logo and title*/}
            <div className='w-full lg:w-5/12'>
                <h2 className='text-[#531733] text-4xl text-center font-bold p-2.5 mt-0 mb-7.5'>ABOUT US</h2>
                <div class="phnx flex justify-center mx-auto pt-14">
                  <Image src="/homepage/volume26_logo.png" alt='volume 26 logo' width={325} height={325}
                  />
                </div>
            </div>
            {/* div for content */}
            <div className='w-full lg:w-7/12 text-justify'>
                <p className='mb-4 mt-4 font-sans text-[#444444]'>
                A magazine is an experiment and it represents a new focus, a new ratio between commerce and intellect.
                </p>
                <p className='mb-4 font-sans text-[#444444]'>
                Pictoreal is one of the distinguished non-technical clubs at PICT. At Pictoreal, our mission is to create and publish the annual magazine of PICT with unique themes that showcase the talents of PICT. Pictoreal organizes several enthusiastic events throughout the year to boost creative minds. The club always promotes one's skills in literature, design, and photography. We support individuals to build practical skills like event management, public speaking, teamwork, and much more. To enhance one's productive skills, we host multiple events like Pics-o-Reel, an annual art and photography exhibition-cum-competition where students can showcase their art pieces. This year, we introduced a new event, Pictofest, which included Pics-o-Reel and various other workshops such as mastering Blender, pottery, and competitions for creative writing and meme making. To promote public speaking skills, we organize Manthan, featuring mini-events such as extempore, debates, group discussions, etc. Pictosocial, a subgroup of Pictoreal believes the culture in
              PICT to lose ourselves in the service of others until we discover our own lives and our happiness. To
              promote the same, we organize events like Tree plantation drives, blood donation and Monetary donation
              drives, and Old-age home or Orphanage visits. To guide and communicate with students in remote areas, we
              organize Career counselling sessions. Here at Pictoreal, we try to step forward, reach out and help the
              students in PICT unleash their creative side.
                </p>
                <p className='mb-4'>
                Our members in Pictoreal always live by one motto-
                </p>
                <p className='font-bold italic'>
                &lsquo;May Thoughts, Colours, and Words prevail!&rsquo;
                </p>
            </div>
        </div>
        {/* Right margin (1 column) */}
        <div className="col-span-1"></div>
        </div>
    </section>
  )
}

export default AboutUs

/*
          <div class="col-lg-5">

            <h2 class="heads">About Us</h2>
            <!-- <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assum perenda sruen jonee trave</h3> -->
            <div class="phnx flex justify-content-center mx-auto"><img src="assets/img/volume26_logo.png" width="100%" alt=""></div>
          </div>
          <div style="justify-content: center; "class="col-lg-7 pt-4 pt-lg-0 ">
            <p>A magazine is an experiment and it represents a new focus, a new ratio between commerce and intellect.
            <p>
            <p class="about-content">Pictoreal is one of the distinguished non-technical clubs at PICT. At Pictoreal, our mission is to create and publish the annual magazine of PICT with unique themes that showcase the talents of PICT. Pictoreal organizes several enthusiastic events throughout the year to boost creative minds. The club always promotes one's skills in literature, design, and photography. We support individuals to build practical skills like event management, public speaking, teamwork, and much more. To enhance one's productive skills, we host multiple events like Pics-o-Reel, an annual art and photography exhibition-cum-competition where students can showcase their art pieces. This year, we introduced a new flagship event, Pictofest, which included Pics-o-Reel and various other workshops such as mastering Blender, pottery, and competitions for creative writing and meme making. To promote public speaking skills, we organize Manthan, featuring mini-events such as extempore, debates, group discussions, etc. Pictosocial, a subgroup of Pictoreal believes the culture in
              PICT to lose ourselves in the service of others until we discover our own lives and our happiness. To
              promote the same, we organize events like Tree plantation drives, blood donation and Monetary donation
              drives, and Old-age home or Orphanage visits. To guide and communicate with students in remote areas, we
              organize Career counselling sessions. Here at Pictoreal, we try to step forward, reach out and help the
              students in PICT unleash their creative side.
            <p>
            <p>Our members in Pictoreal always live by one motto-
            <p>
            <p class="fst-italic">
              <b><b>‘May Thoughts, Colours, and Words prevail!’</b></b>
            </p>

            </p>
            <!-- <ul>
              <li><i class="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequa</li>
              <li><i class="ri-check-double-line"></i> Duis aute irure dolor in reprehenderit in voluptate velit</li>
              <li><i class="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</li>
            </ul>
            <p class="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p> -->
          </div>
*/