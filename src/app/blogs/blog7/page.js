// pages/Blog7.jsx
import Link from "next/link";
import ArrowBtn from "@/components/homepage/arrowbtn";

export default function Blog7() {
  return (
    <>
      <div className="flex sm:mt-[10vh] flex-col p-2 md:px-10">
        <div className="relative bg-[#a4cde4] w-full md:w-4/5 max-w-[1200px] p-2 md:p-5 border-[10px] border-[#111c33] mx-auto">

          {/* Centered Title */}
          <div className="font-heading text-[#111c33] font-extrabold pt-2 sm:text-5xl text-3xl text-firefly text-center mt-5 mb-8 sm:mt-14 sm:mb-5">
            Language Segregation: A Silent Divider in a Loud World
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center w-auto md:w-1/2 gap-8 mx-auto md:mx-32">
              <img
                src="/blog/Blog7/blog7-poster-img.png"
                alt="Language Segregation poster"
                className="w-auto md:w-2/3 h-auto border-[5px] border-firefly"
              />
            </div>
            <div className="font-body text-[20px] text-firefly flex flex-col items-center px-4 pt-8 text-center">
              <p className="text-firefly">Authors: Aswathi Pillai, Rania Abbas</p>
              <p className="text-firefly">Editors: Ameya Surve, Kasturi Kirpal</p>
              <p className="mt-3 max-w-2xl">
                Ever felt left out just because you didn't speak the "right" language?
                Maybe this blog is for you — read and find out how language segregation
                works in real life and why it's worth talking about.
              </p>
            </div>
          </div>

          <div className="text-justify font-body text-[17px] text-firefly p-8 pl-[10px] pr-[10px] pt-[30px] pb-[30px]">
            <article className="max-w-4xl mx-auto md:p-5">

              {/* Intro paragraph(s) (sourced from the uploaded PDF pages 1-4). */}
              <p className="mb-4">
                Checkmate. One of those phrases that determines whether you’ve won or lost.
                Now imagine a game of chess where you don’t know your opponent’s moves until
                one of your pieces is taken. It’s up to you to figure out how to move your pawn.
                Where do you place each piece? Is it in the right position? What is your opponent planning?
              </p>

              <p className="mb-4">
                We often hear about racism, gender inequality, or class discrimination. But there’s another quiet yet powerful force that separates people: language segregation.
                It doesn’t shout — it quietly decides who fits in and who doesn’t, affecting how we communicate, who we connect with, and what opportunities we get.
              </p>

              {/* centered image (page image like in PDF) */}
              <div className="flex justify-center w-full md:w-3/4 mx-auto mb-5">
                <img
                  src="/blog/Blog7/Blog7-content-1.png"
                  className="border-[5px] border-[#1a365d] w-full h-auto"
                  alt="People with flags / language illustration"
                />
              </div>

              <h3 className="text-xl font-bold font-heading py-4 mt-4 text-left">
                Where Do We See It?
              </h3>

              <p className="mb-4">
                Language segregation shows up everywhere — in schools where students who speak
                their mother tongue may be laughed at or told to “speak properly,” in workplaces
                where the one who sounds most polished gets noticed, and online where those not
                fluent in English often remain silent to avoid correction or ridicule.
              </p>

              <p className="mb-4">
                For students from other countries the struggle amplifies: they must learn new
                subjects and a new language, while often being subject to rude comments about
                accents. The result — isolation, loss of confidence, and fewer perspectives in
                conversations.
              </p>

              {/* another centered image (replicating PDF center image) */}
              <div className="flex justify-center mb-4">
                <img
                  src="/blog/Blog7/Blog7-content-2.png"
                  className="border-[5px] border-[#1a365d] w-3/5 h-auto"
                  alt="People with flags / language illustration"
                />
              </div>

              <h3 className="text-xl font-bold font-heading py-4 mt-4 text-left">
                It Works Both Ways
              </h3>

              <p className="mb-4">
                Language segregation cuts both ways — outsiders who don’t know the local language
                are made to feel left out, and locals who want to preserve their language can end up
                excluding newcomers. Both experiences cause the same pain: isolation, feeling
                judged, and disconnection.
              </p>

              <p className="mb-4">
                Language is identity. Telling someone their language is “less than” is telling them
                they are “less than.” Beyond grammar and accents, this is about dignity, confidence,
                and belonging.
              </p>

              <div className="md:flex justify-center mb-4 gap-4">
                <img
                  src="/blog/Blog7/Blog7-content-3.png"
                  className="border-[5px] border-[#1a365d] w-4/5 h-auto"
                  alt="People with flags / language illustration"
                />
              </div>

              <p className="mb-4">
                Conclusion: Language should connect us — not divide us. Embracing every language
                — from Tamil to Telugu, Urdu to Marathi — is the first step toward true equality.
                When we let people speak freely in their own tongues, we hear and understand them better.
              </p>

            </article>

            <div className="flex flex-col items-center w-full">
              <div className="flex">
                <ArrowBtn text="Back" path={`/blogs`} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
