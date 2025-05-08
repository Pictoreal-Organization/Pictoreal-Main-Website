"use client"
import { useEffect, useRef } from "react";

export default function Counter() {
  const sectionCounterRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const sectionCounter = sectionCounterRef.current;
    if (!sectionCounter) return;

    const updateCounter = (counter, targetNumber, speed) => {
      const initialNumber = +counter.innerText;
      const incPerCount = targetNumber / speed;
      if (initialNumber < targetNumber) {
        counter.innerText = Math.ceil(initialNumber + incPerCount);
        setTimeout(() => updateCounter(counter, targetNumber, speed), 40);
      }
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        const speed = 200;
        countersRef.current.forEach((counter, index) => {
          const targetNumber = +counter.dataset.target;
          updateCounter(counter, targetNumber, speed);
          if (counter.parentElement.style.animation) {
            counter.parentElement.style.animation = "";
          } else {
            counter.parentElement.style.animation = `slide-up 0.3s ease forwards ${
              index / countersRef.current.length + 0.5
            }s`;
          }
        });
        observer.unobserve(sectionCounter);
      },
      {
        root: null,
        threshold: window.innerWidth > 768 ? 0.4 : 0.3,
      }
    );

    counterObserver.observe(sectionCounter);
    return () => {
      counterObserver.disconnect();
    };
  }, []);

  const counterItems = [
    { target: 35, label: "Years since inception", color: "bg-firefly" },
    { target: 10, label: "Events every year", color: "bg-[#C8A455]" },
    { target: 120, label: "Members", color: "bg-firefly" },
  ];

  return (
    <section
      id="section_counter"
      ref={sectionCounterRef}
      className="w-full py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-firefly text-4xl md:text-4xl text-center font-bold mb-16">
          NUMBERS THAT WE ADMIRE!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {counterItems.map((item, index) => (
            <div
              key={index}
              className={`${item.color} p-12 rounded-lg transform transition-transform duration-300 hover:scale-105`}
            >
              <div className="text-center"
                ref={(el) => {
                  if (el) countersRef.current[index] = el.querySelector('.number');
                }}
              >
                <div className="flex items-center justify-center">
                  <span 
                    className="number text-mist text-5xl md:text-6xl font-bold"
                    data-target={item.target}
                  >
                    0
                  </span>
                  <span className="text-mist text-5xl md:text-6xl font-bold ml-1">+</span>
                </div>
                <p className="text-mist text-xl mt-4 font-medium">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}