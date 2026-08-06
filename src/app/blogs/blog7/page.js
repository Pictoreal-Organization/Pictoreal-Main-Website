// pages/Blog7.jsx
import Link from "next/link";
import ArrowBtn from "@/components/homepage/arrowbtn";

export default function Blog7() {
  return (
    <>
      <div className="flex sm:mt-[10vh] flex-col p-2 md:px-10">
        <div className="relative bg-[#86C5C5] w-full md:w-4/5 max-w-[1200px] p-2 md:p-5 border-[10px] border-[#0A2B2B] mx-auto">

          {/* Centered Title */}
          <div className="font-heading text-[#0A2B2B] font-extrabold pt-2 sm:text-5xl text-3xl text-firefly text-center mt-5 mb-8 sm:mt-14 sm:mb-5">
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
            </div>
          </div>

          <div className="text-justify font-body text-[17px] text-firefly p-8 pl-[10px] pr-[10px] pt-[30px] pb-[30px]">
            <article className="max-w-4xl mx-auto md:p-5">

              {/* Introduction */}
              <p className="mb-4">
                Checkmate. One of those phrases that determines whether you’ve won or lost. Now imagine a game of chess where you don’t know your opponent’s moves until one of your pieces is taken. It’s up to you to figure out how to move your pawn. Where do you place each piece? Is it in the right position? What is your opponent planning?
              </p>

              <p className="mb-4">
                Perhaps you never truly learned how to play. Maybe the pawn doesn’t belong where you placed it. Maybe the wisest move is to slip away from the game and hope for a more predictable opponent next time.
              </p>

              <p className="mb-4">
                Which pieces do you protect, and which remain silent, waiting for their moment to play their role? In the end, both sides want the same thing: to protect their king.
              </p>

              <p className="mb-4">
                Evidently, what move does one make when they’re unable to understand the intentions of the other player, when the rules themselves seem unclear, and every action carries the weight of uncertainty?
              </p>

              <p className="mb-4">
                We often hear about racism, gender inequality, or class discrimination. But there’s another quiet yet powerful force that separates people: language segregation. It’s sneaky - it doesn’t shout, it just quietly decides who fits in and who doesn’t. It affects how we communicate, who we connect with, and even what opportunities we get. And the funniest (or saddest) part? Most of us don’t even notice it happening until one day someone says, “Sorry, what? Speak in English na…” and suddenly, you feel like you’ve been put on mute.
              </p>

              <h3 className="text-xl font-bold font-heading py-4 mt-4 text-left">
                What is Language Segregation?
              </h3>

              <p className="mb-4">
                Language segregation is when people are treated differently or kept apart based on the language they speak. It can happen in schools, workplaces, media, or even among friends. It’s like an invisible wall made of words - and honestly, walls of bricks are easier to break. At least you can call a hammer for those. But for this one? Even Google Translate sometimes gives up.
              </p>

              {/* centered image */}
              <div className="flex justify-center w-full md:w-3/4 mx-auto mb-5">
                <img
                  src="/blog/Blog7/Blog7-content-1.png"
                  className="border-[5px] border-[#0A2B2B] w-full h-auto"
                  alt="People with flags / language illustration"
                />
              </div>

              <h3 className="text-xl font-bold font-heading py-4 mt-4 text-left">
                Where Do We See It?
              </h3>

              <p className="mb-4">
                Language segregation shows up everywhere, even when we don’t realize it. In schools, students who speak their mother tongue or a regional language may be laughed at or told to “speak properly” (As if speaking English automatically makes you Einstein!) This often embarrasses them and pushes them to hide their real identity. They start acting differently, just to fit in - kind of like wearing a mask, except way less cool than the superhero kind.
              </p>

              <p className="mb-4">
                For students from other countries, the struggle is even bigger. They already face the challenge of learning new subjects, but on top of that, they have to adjust to a new language and culture. Instead of support, they often hear things like, “Your accent is funny.” That’s not funny - that’s just rude. The result? They feel left out, lonely, and lose confidence.
              </p>

              <p className="mb-4">
                At workplaces, sometimes the job doesn’t even need much English, but guess who gets the best roles? The one who can say, “Let’s circle back to this later” in a meeting. (Circle back to what? Nobody knows.) Meanwhile, someone who’s actually skilled doesn’t get noticed, all because they didn’t sound “polished” enough.
              </p>

              <p className="mb-4">
                Online, people who aren’t fluent in English often hesitate to share their thoughts because they’re scared of being corrected or ignored. So, they stay silent - which is sad, because that means fewer funny comments, fewer perspectives, and a lot less diversity in conversations.
              </p>

              <div className="flex justify-center mb-4">
                <img
                  src="/blog/Blog7/Blog7-content-2.png"
                  className="border-[5px] border-[#0A2B2B] w-3/5 h-auto"
                  alt="People with flags / language illustration"
                />
              </div>

              <p className="mb-4">
                But this isn’t a one-way street. Language segregation also works in the opposite direction. For example, in many parts of India, outsiders who don’t speak the local language - whether it’s Marathi in Maharashtra, Kannada in Karnataka, or Tamil in Tamil Nadu - are often made to feel left out. Imagine moving to a new city for studies or work and hearing, “Oh, you don’t know our language? Then you’re not really one of us.” That hurts just as much as being told your mother tongue isn’t “good enough.”
              </p>

              <p className="mb-4">
                For locals, the argument is usually, “This is our culture, our identity, so you must respect it.” And honestly, they’re right to want to preserve their language - it’s a part of who they are. But when preservation turns into exclusion, it stops being about pride and starts becoming a silent form of segregation. Outsiders may feel they’re being judged for not knowing the language, even if they’re trying to learn or are contributing in other meaningful ways.
              </p>

              <p className="mb-4">
                So, language segregation works both ways:
                <br />· Sometimes, people are judged for not speaking English well.
                <br />· Sometimes, they’re judged for not knowing the local language.
                <br />In both cases, the result is the same - people feel isolated, inferior, and disconnected.
              </p>

              <div className="md:flex justify-center mb-4 gap-4">
                <img
                  src="/blog/Blog7/Blog7-content-3.png"
                  className="border-[5px] border-[#0A2B2B] w-4/5 h-auto"
                  alt="People with flags / language illustration"
                />
              </div>

              <h3 className="text-xl font-bold font-heading py-4 mt-4 text-left">
                Why Does It Matter?
              </h3>

              <p className="mb-4">
                Language is more than just words. It carries our identity, emotions, culture, and sense of belonging. Telling someone their language is “less than” is basically telling them they are less than. And that kind of thing can really crush a person’s confidence - sometimes faster than a surprise class test result.
              </p>

              <p className="mb-4">
                It’s not just about communication. Differences in language can decide friendships, opportunities, and even careers. Many people have lost chances to build strong relationships, not because they weren’t good enough, but simply because others didn’t take the time to understand them. What could have been amazing collaborations or friendships often ends up as awkward silence - all because of a few words (or the lack of them).
              </p>

              <h3 className="text-xl font-bold font-heading py-4 mt-4 text-left">
                Conclusion
              </h3>

              <p className="mb-4">
                Language should connect us - not divide us. In a diverse country like India, and in such a connected world, embracing every language is the first step toward true equality. Because when we let people speak freely in their own tongue, we don’t just hear them better - we understand them better.
              </p>

              <p className="mb-4">
                No language is superior. English may be global, but every language - from Tamil to Telugu, Urdu to Marathi, Hindi to Bengali - has its own beauty and importance. Forcing one language as the only “correct” way is unfair and, honestly, a little silly.
              </p>

              <p className="mb-4">
                It’s like a forgotten struggle: those enforcing it pretend it doesn’t exist, and those facing it quietly adjust. But the truth is, language segregation isn’t just about grammar or accents - it’s about dignity, confidence, and belonging. And maybe if we all stopped obsessing about “perfect English,” we’d finally hear the real voices that are waiting to be heard.
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
