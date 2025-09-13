import Link from "next/link";

export default function Blog1() {
  return (
    <>
      <div className="flex flex-col p-2 mt-[10vh]  md:p-10 pt-10">
        <div className="relative bg-[#a4cde4] w-full md:w-4/5 max-w-[1200px] p-2 md:p-5 border-[10px] border-[#1a365d] mx-auto">
          <div className="font-heading font-extrabold text-[#111c33] pt-2 text-5xl text-center mt-14 mb-5">
            Uncanny Valley
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/blog/1.svg"
              alt="Design"
              className="m-auto max-w-full h-auto"
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center w-auto md:w-2/3 gap-8 mx-auto md:mx-32">
              <img
                src="/blog/blog1-poster-img.jpg"
                alt="Blog Poster"
                className="w-auto md:w-2/3 h-auto border-[5px] border-firefly"
              />
            </div>
            <div className="font-poppins text-[20px] font-body text-firefly pl-8 pt-8 text-center">
              <span className="text-firefly">Author: </span>Prem Rahinj, Spondon
              Nath
            </div>
          </div>

          <div className="text-justify font-poppins font-body text-[17px] text-firefly p-8 pl-[10px] pr-[10px] pt-[30px] pb-[30px]">
            <article>
              <p>
                When we picture an ideal being, what do we think of? One can say
                that a perfect individual is blessed with the possessions one
                understands to be ideal and perfect in their eyes, be it
                academics, social interaction, cognitive ability, and whatnot.
                To become an ideal being like this is nearly impossible for us
                humans to achieve. But the same does not apply to the
                enterprising advancements of technology in today's era.
              </p>
              <br />
              <p className="mb-5">
                Six years ago, Jimmy Fallon interviewed{" "}
                <i>Sofia, a Human-Like social robot</i> that could interact with
                people in real-time using AI and Computer vision. On airing, the
                interview went popular amongst viewers due to a small segment
                where the 'robot' played and won a game of Rock-Paper-Scissors
                with the host. It was sensational to see an inanimate object
                interact, understand, play, and beat a human at its own game.
                But what sent chills down my spine was when she casually said –{" "}
                <i>
                  "I won, this is a good beginning of my plan to dominate the
                  human race."
                </i>
              </p>
              <div className="blog-content-image w-full flex justify-center items-center">
                <img
                  className="w-auto h-auto max-w-full md:max-w-4/6 border-[5px] border-[#1a365d]"
                  src="../blog/blog1-content-image-1.png"
                  alt="Sofia the robot"
                />
              </div>
              <br />
              <p className="mb-5">
                Ready to dive into the real-world{" "}
                <b className="text-lg">Uncanny Valley?</b> It's a place where AI
                meets humanity in ways that might make one reconsider their
                future. In today's AI-packed world, we're not just talking about
                it; we're living in it. The uncanny valley effect is a sensation
                experienced by humans when AI entities closely resembling humans
                in appearance or behavior exhibit subtle, unnatural traits or
                imperfections, evoking a strong sense of discomfort, eeriness,
                or unease in human observers.
              </p>
              <div className="blog-content-image flex justify-center items-center">
                <img
                  className="w-auto h-auto max-w-full border-[5px] border-[#1a365d] md:max-w-1/2"
                  src="../blog/blog1-content-img-2.webp"
                  alt="Uncanny Valley"
                />
              </div>
              <br />
              <p className="mb-5">
                AI is no longer a buzzword. It's an artist that paints our
                reality with shades of 'almost-human'. The 'why' behind its
                development is driven by the quest for making machines act so
                convincingly that they leave us blinking in disbelief. The more
                one ponders about its potential implications, the scarier the{" "}
                <i>"WHAT IFs"</i> get. But how does AI manage to blur the lines
                so seamlessly?
              </p>
              <div className="blog-content-image flex justify-center items-center">
                <img
                  className="w-auto h-auto max-w-full border-[5px] border-[#1a365d] md:max-w-2/3"
                  src="../blog/blog1-content-img-3.png"
                  alt="AI blurring lines"
                />
              </div>
              <br />
              <p>
                Horizons of AI broaden with every new patch. It writes, reads,
                speaks, and interacts with immense efficiency and unmatchable
                accuracy. A threatening metric of its devastating efficiency is
                the number of people laid off, which increases by the day.{" "}
                <i>Chat-GPT</i>, one of the biggest job eaters today, is a
                prompt-based AI tool designed to understand, respond, and engage
                in human-like conversations on a wide range of topics. Similar
                to <i>Chat-GPT</i> is <i>Replica</i>, another conversational
                partner created to display companionship, self-reflection, and
                improve conversational skills. All this is executed so well,
                that it seemingly emits distinct human traits like empathy and
                sorrow. By their very nature, both <i>Chat-GPT and Replica</i>,
                are designed to help humans in everyday tasks. But there is a
                silver line to it as often these models produce false results
                that seem so satisfactory, that one might be left struck by awe.
                So arises another disbelief.{" "}
                <b className="text-lg">
                  Should we trust AI or not? What if it knows how to lie?
                </b>{" "}
                When given a thought, doesn't it seem more discouraging than
                nourishing? The uncanny of these interestingly engaging thoughts
                could be considered wizardly delusive enough to tickle even the
                stiffest of brains.
              </p>
              <br />
              <p className="mb-5">
                Speaking of wizardry, an artist's imaginative perspective and
                ability to colorize his imagination into physical matter is no
                less than developing spells. Can AI do the same? Absolutely! I
                mean just think of it. If it was not curious about art, could{" "}
                <i>DALL-E</i> ever stay in the market? DALL-E is a plug-in that
                combines concepts, attributes, and styles to create original,
                realistic images and it's capable of putting even the best of
                the artists to shame. This is where the bounds of humanity and
                AI are clearly stated. Where it takes years of training to
                achieve human abilities, a machine can effortlessly calculate it
                using algorithms. The quality of art provided is unmatched for
                the minimal costs of a few megabytes of internet access and a
                few seconds required to type the prompt, and done, that's it,
                premium images with flaws nearly equal to zero served. This
                raises a question as to why approach and pay when you can
                independently generate art for yourselves with AI. This is the
                uncanny valley.
              </p>
              <div className="blog-content-image flex justify-center items-center">
                <img
                  className="w-auto h-auto max-w-full border-[5px] border-[#1a365d] max-w-4/6"
                  src="../blog/blog1-content-img-4.jpg"
                  alt="DALL-E art"
                />
              </div>
              <br />
              <p>
                The Uncanny Valley conceptualizes the emptiness encountered
                between <i>extremely precise and non-human</i>. It describes the
                point at which a humanoid object, such as a robot or an animated
                character, closely resembles a human but is still noticeably
                artificial or non-human, causing a feeling of unease or
                discomfort in observers. In this theory, people feel a sense of
                unease, uneasiness, or discomfort when they see robots or
                animated characters that are extremely close to being human but
                are not entirely lifelike.
              </p>
            </article>
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-center w-full mb-4">
                <img
                  src="/blog/3.svg"
                  alt="Content Image"
                  className="w-7/10 "
                />
              </div>
              <Link href="/blogs">
                <div className="flex items-center justify-center hover:text-white h-10 w-24 rounded-2xl border-2 border-[#1a365d] bg-lynch text-shadow-deepnavy shadow-md hover:bg-[#111c33] transition-transform transform hover:scale-110">
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
