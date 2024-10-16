import React, { useState, useEffect, useCallback } from "react";

// Animation Liabraries
import { easeInOut, motion as m } from "framer-motion";

// Context
import { useCursorContext } from "../context/CursorContext";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import RotatingCircleText from "../components/RotatingCircleText";

/**
 * Home component with integrated animations.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home: React.FC = () => {
  const { mouseOverEvent, mouseOutEvent } = useCursorContext();

  // Animation state for count, circle shadows, and rotation
  const [count, setCount] = useState<number>(1);
  const [isInnerComplete, setIsInnerComplete] = useState<boolean>(false);
  const [isRotatingComplete, setIsRotatingComplete] = useState<boolean>(false);
  const [isOuterComplete, setIsOuterComplete] = useState<boolean>(false);

  // State for managing the dynamic line height and touch events
  const [lineHeight, setLineHeight] = useState<string>("h-[15vh]");
  const [isTouch, setIsTouch] = useState<boolean>(false);

  // Trigger the count animation from 1 to 147
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCount((prevCount) => {
          if (prevCount < 147) {
            return prevCount + 1;
          } else {
            clearInterval(interval);
            return prevCount;
          }
        });
      },
      2000 / (count + 20),
    );

    return () => clearInterval(interval);
  }, [count]);

  // Add custom-box-shadow to circles and rotating text
  useEffect(() => {
    if (count === 147) {
      const innerTimeout = setTimeout(() => setIsInnerComplete(true), 300);
      const outerTimeout = setTimeout(() => setIsOuterComplete(true), 500);
      const rotatingTimeout = setTimeout(
        () => setIsRotatingComplete(true),
        700,
      );

      return () => {
        clearTimeout(innerTimeout);
        clearTimeout(outerTimeout);
        clearTimeout(rotatingTimeout);
      };
    }
  }, [count]);

  // Event Handlers
  const adjustLineHeight = (height: string, delay: number = 300) => {
    setLineHeight(height);
    setTimeout(() => setLineHeight("h-[15vh]"), delay);
  };

  const handleTouchStart = useCallback(() => {
    setIsTouch(true);
    setLineHeight("h-[5vh]");
  }, []);

  const handleTouchEnd = useCallback(() => {
    adjustLineHeight("h-[70vh]");
  }, []);

  const handleMouseDown = useCallback(() => {
    if (isTouch) return;
    setLineHeight("h-[5vh]");
  }, [isTouch]);

  const handleMouseUp = useCallback(() => {
    if (isTouch) return;
    adjustLineHeight("h-[70vh]");
  }, [isTouch]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isTouch) return;
      triggerHeightChange();
      event.currentTarget.blur();
    },
    [isTouch],
  );

  const triggerHeightChange = () => {
    setLineHeight("h-[5vh]");
    setTimeout(() => setLineHeight("h-[70vh]"), 300);
    setTimeout(() => setLineHeight("h-[15vh]"), 600);
  };

  return (
    <div className="m-auto flex h-screen w-full max-w-3xl flex-col items-center justify-between gap-12 overflow-x-hidden p-6 pb-0">
      {/* Header and Navigation */}
      <Header isRotatingComplete={isRotatingComplete} />

      {/* Main Content Area */}
      <main className="flex h-full w-full flex-col items-center gap-8 pb-20">
        {/* Outer Circle with Rotating Text and Inner Circle */}
        <div
          className={`relative mb-8 flex aspect-square h-auto max-h-80 w-full max-w-80 items-center justify-center rounded-full bg-[#202020] transition-all duration-700 ease-in-out ${
            isOuterComplete ? "custom-box-shadow" : ""
          }`}
        >
          <RotatingCircleText isRotatingComplete={isRotatingComplete} />

          {/* Inner Circle with Animated Number */}
          <div
            className={`flex h-[70%] w-[70%] items-center justify-center overflow-hidden rounded-full transition-all duration-700 ease-in-out ${
              isInnerComplete ? "custom-box-shadow" : ""
            }`}
          >
            <m.span
              className="font-rubik text-5xl md:text-6xl"
              key={count}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {count}
            </m.span>
          </div>
        </div>

        {/* Description Paragraph */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={isRotatingComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full text-center text-sm tracking-wider"
        >
          Looking for a great place to play pool and
          <br /> unwind? Book a table with us and enjoy a
          <br /> fun, relaxed atmosphere. Whether you’re
          <br /> a pro or just playing for fun, our top-
          <br /> quality tables and friendly vibe
          <br /> guarantee a great time.
        </m.p>

        {/* Action Button */}
        <m.button
          className="cursor-none rounded-full border border-white bg-[#202020] px-4 py-2 text-sm font-semibold tracking-wider transition-all hover:border-[#202020] hover:bg-white hover:text-[#202020] focus:border-[#202020] focus:bg-white focus:text-[#202020] focus:outline-none"
          onMouseOver={mouseOverEvent}
          onMouseOut={mouseOutEvent}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isRotatingComplete ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: easeInOut }}
          aria-label="Book a table"
          title="Book a table"
          type="button"
          tabIndex={0}
        >
          Book a table
        </m.button>
      </main>

      {/* Footer and Social Links */}
      <Footer lineHeight={lineHeight} isRotatingComplete={isRotatingComplete} />
    </div>
  );
};

export default Home;
