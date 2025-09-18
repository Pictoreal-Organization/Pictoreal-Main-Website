import Link from "next/link";

export default function Blog2() {
  return (
    <>
      <div className="flex sm:mt-[10vh] flex-col p-2 md:px-10">
        <div className="relative bg-[#a4cde4] w-full md:w-4/5 max-w-[1200px] p-2 md:p-5 border-[10px] border-[#111c33] mx-auto">
          <div className="font-heading text-[#111c33] font-extrabold pt-2 sm:text-5xl text-3xl text-firefly text-center mt-5 mb-8 sm:mt-14 sm:mb-5">
            Mysteries of Particle Physics: A Cosmic Dance of Tiny Wonders and
            Universal Forces
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-7/11 gap-8 border-[5px] border-[#1a365d] mx-16">
              <img
                src="/blog/blog2-poster-img.png"
                alt="Blog Poster"
                className="w-full border-5 border-[#1a365d]"
              />
            </div>
            <div className="font-body text-[20px] flex text-cenetr text-firefly pt-8">
              <p className="text-firefly text-center justify-center">
                Author: Shrihari Kulkarni
              </p>
            </div>
          </div>

          <div className="text-justify font-body text-[17px] text-firefly p-8 pl-[10px] pr-[10px] pt-[30px] pb-[30px]">
            <article className="max-w-4xl mx-auto md:p-5">
              <p className="mb-4">
                Once upon a time, in a universe far, far smaller than we can
                imagine, there existed a hidden realm known as particle physics.
                This enchanting realm, filled with tiny, mysterious entities,
                plays a crucial role in shaping the very fabric of our
                existence. Imagine stepping into a magical world where the
                ordinary rules of reality no longer apply, and where particles
                dance and twirl in a cosmic ballet. Let's embark on a journey to
                unravel the secrets of particle physics, where the minuscule
                becomes monumental.
              </p>

              <h3 className="text-xl font-bold font-heading py-4 mt-4">
                Chapter 1: The Intro - Our Subatomic Stage
              </h3>
              <p className="mb-4">
                Our adventure begins with the realization that everything around
                us, including ourselves, is made up of particles. These
                particles, the building blocks of the universe, come in various
                shapes and sizes, each with its own unique characteristics. From
                the familiar protons and neutrons nestled within the heart of an
                atom to the elusive neutrinos that flit through the cosmos,
                these tiny entities hold the key to understanding the grand
                tapestry of existence.
              </p>

              <div className="md:flex justify-center mb-4">
                <img
                  src="../blog/blog2-content-1.png"
                  className="flex-1 border-[5px] border-[#1a365d] mb-5 md:mb-0"
                  alt="Image 1"
                />
                <img
                  src="../blog/blog2-content-2.png"
                  className="flex-1 border-[5px] border-[#1a365d]"
                  alt="Image 2"
                />
              </div>

              <h3 className="text-xl font-bold font-heading py-4 mt-4">
                Chapter 2: The Cast of Characters
              </h3>
              <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                <div className="flex-shrink-0 mr-2 ">
                  <img
                    src="../blog/blog2-content-3.png"
                    className="w-44 border-[5px] border-[#1a365d]"
                    alt="Image 3"
                  />
                </div>
                <p className="flex-1 px-4">
                  In the subatomic realm, particles are the stars of the show.
                  Meet the quarks,{" "}
                  <b className="text-base">
                    the whimsical elementary particles that come in six distinct
                    flavours – up, down, charm, strange, top, and bottom.
                  </b>{" "}
                  These quirky quarks, bound by the force of gluons, form the
                  protons and neutrons that make up the nucleus of an atom.
                  Don't forget the electrons, the elegant dancers that orbit the
                  atomic nucleus, creating the delicate harmony that keeps
                  matter stable.
                </p>
              </div>

              <h3 className="text-xl py-4 font-bold font-heading mt-4">
                Chapter 3: The Forces at Play
              </h3>
              <p className="mb-4">
                As our story unfolds, we encounter the fundamental forces that
                govern the interactions between particles. Picture the
                electromagnetic force as the puppeteer, guiding charged
                particles like electrons through their cosmic waltz. The strong
                nuclear force, reminiscent of a cosmic glue, binds quarks
                together within protons and neutrons. The weak nuclear force, a
                gentle hand, oversees processes like radioactive decay, adding a
                touch of drama to our subatomic tale.
              </p>

              <div className="flex justify-center mb-4">
                <img
                  src="../blog/blog2-content-4.png"
                  className="border-[5px] border-[#1a365d]"
                  alt="Image 4"
                />
              </div>

              <h3 className="text-xl py-4 font-bold font-heading mt-4">
                Chapter 4: The Quantum Quest
              </h3>
              <div className="md:flex mb-4">
                <div className="flex-1 px-4">
                  <p>
                    No journey through particle physics would be complete
                    without delving into the mysterious realm of quantum
                    mechanics. Brace yourself for a mind-bending exploration
                    where particles exist in multiple states at once, seemingly
                    teleport across space, and engage in a dance of uncertainty.
                    The quantum world challenges our everyday notions, inviting
                    us to embrace the weird and wonderful aspects of reality on
                    the tiniest scales.
                  </p>
                </div>
                <div className="">
                  <img
                    src="../blog/blog2-content-6.png"
                    className="border-[5px] border-[#1a365d]"
                    alt="Image 5"
                  />
                </div>
              </div>

              <h3 className="text-xl py-4 font-bold font-heading mt-4">
                Chapter 5: The Higgs Boson – The Celestial Composer
              </h3>
              <div className="md:flex mb-4">
                <div className="flex-shrink-0">
                  <img
                    src="/blog/blog2-content-5.png"
                    className="border-[5px] border-[#1a365d]"
                    alt="Image 6"
                  />
                </div>
                <div className="flex-1 px-4">
                  <p>
                    In the grand finale of our particle physics saga, we
                    encounter the Higgs boson, a celestial composer that imparts
                    mass to other particles. Imagine a cosmic orchestra where
                    the
                    <i>
                      <b className="text-base">
                        Higgs boson orchestrates the symphony of the universe,
                        weaving together the threads of mass and energy.
                      </b>
                    </i>{" "}
                    The Higgs particle fills up our entire universe like a sea
                    of Higgs bosons with each and every particle floating in it,
                    so{" "}
                    <b className="text-base">
                      the resistance offered by the Higgs field to any moving
                      particle is nothing but the mass of that particle.
                    </b>
                  </p>
                </div>
              </div>

              <h3 className="text-xl py-4 font-bold font-heading mt-4">
                Chapter 6: The Fundamental Forces - Cosmic Choreography
              </h3>
              <p className="mb-4">
                Beyond the particles themselves, we must acknowledge the cosmic
                choreography orchestrated by the fundamental forces of the
                universe. Gravitational force, the maestro of the cosmos, pulls
                celestial bodies into a cosmic dance, shaping galaxies and
                guiding planets in their celestial orbits. The electromagnetic
                force, a cosmic conductor, influences the behaviour of charged
                particles, giving rise to the dance of light and the electric
                currents that power our technology.
              </p>

              <div className="mb-4">
                <img
                  src="../blog/blog2-content-7.png"
                  className="border-[5px] border-[#1a365d]"
                  alt="Image 7"
                />
              </div>

              <p className="mb-4">
                As our adventure in the world of particle physics and
                fundamental forces comes to a close, we leave with a newfound
                appreciation for the intricate dance of particles and the cosmic
                choreography that shapes our reality. While the subatomic realm
                may seem like a distant fairy tale, its influence, along with
                the fundamental forces, reverberates through the very fabric of
                the universe, connecting the smallest particles to the vast
                cosmos. So, dear reader, the next time you gaze up at the stars,
                remember the enchanting world of particle physics and the
                fundamental forces that unfold beyond our naked eye—a realm
                where the tiniest entities and the cosmic forces hold the
                secrets of the cosmos.
              </p>

              <div className="md:flex mb-4">
                <p className="font-body text-2xl font-semibold italic mr-2">
                  <i>
                    In the cosmic ballet of quarks and light, Particles dance in
                    the depths of the night. Fundamental forces, silent and
                    grand, Shape the universe with an unseen hand.
                  </i>
                </p>
                <div className="flex md:flex-shrink-0 justify-center items-center">
                  <img
                    src="../blog/blog2-content-8.png"
                    className="border-[5px] border-[#1a365d]"
                    alt="Image 8"
                  />
                </div>
              </div>
            </article>
            <div className="flex flex-col items-center w-full">
              <Link href="/blogs">
                <div className="flex items-center justify-center h-10 w-24 hover:text-white rounded-2xl border-2 border-[#1a365d] bg-lynch text-shadow-deepnavy shadow-md hover:bg-[#111c33] transition-transform transform hover:scale-110">
                  Back
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
