"use client";

import AboutUs from "./aboutus";
import BackToTopButton from "./backtotop";
import Counter from "./counter";
import Events from "./events";
import Footer from "./footer";
import Hero from "./hero";

const HomePage = () => {
  return (
    <>
      <main>
        <Hero></Hero>
        <AboutUs></AboutUs>
        <Counter></Counter>
        <Events></Events>

        {/* <Footer></Footer> */}
        <BackToTopButton></BackToTopButton>
      </main>
    </>
  );
};

export default HomePage;
