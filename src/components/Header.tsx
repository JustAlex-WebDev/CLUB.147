import React, { useState, useEffect } from "react";

// Context
import { useCursorContext } from "../context/CursorContext";

// Animation Libraries
import {
  motion as m,
  motionValue,
  useAnimate,
  useDragControls,
} from "framer-motion";
import useMeasure from "react-use-measure";

// Define props interface
interface HeaderProps {
  isRotatingComplete: boolean;
}

/**
 * Header Component
 * Displays the website's header with a logo and a hamburger menu.
 * The menu is draggable and animated using Framer Motion.
 */
const Header: React.FC<HeaderProps> = ({ isRotatingComplete }) => {
  const { mouseOverEvent, mouseOutEvent } = useCursorContext();

  // Framer Motion animation hooks
  const [scope, animate] = useAnimate();
  const x = motionValue(0);
  const [drawerRef, { width }] = useMeasure();

  // Drag controls for the menu
  const controls = useDragControls();

  // State to track if the menu is open
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  /**
   * Toggles the menu's open/close state.
   */
  const handleMenuToggle = async () => {
    const xStart = typeof x.get() === "number" ? x.get() : 0;

    if (isMenuOpen) {
      // Animate opacity and drawer sliding out when closing the menu
      animate(
        scope.current,
        { x: ["0%", "100%"] },
        { ease: "easeInOut", duration: 0.5 },
      );
      await animate(
        "#drawer",
        { x: [xStart, width] },
        { ease: "easeInOut", duration: 0.5 },
      );
      setMenuOpen(false); // Set menu state to closed
    } else {
      // Optionally add an animation for opening the menu
      setMenuOpen(true); // Set menu state to open
    }
  };

  /**
   * Closes the menu with an animation.
   * Animates the opacity and horizontal position of the drawer to slide out of view.
   */
  const handleClose = async () => {
    const xStart = typeof x.get() === "number" ? x.get() : 0;

    // Animate opacity and drawer sliding out with the same transition timing
    animate(
      scope.current,
      { x: ["0%", "100%"] },
      { ease: "easeInOut", duration: 0.5 },
    );
    await animate(
      "#drawer",
      { x: [xStart, width] },
      { ease: "easeInOut", duration: 0.5 },
    );

    // Set the menu state to closed after the animation
    setMenuOpen(false);
  };

  /**
   * Handle swipe gestures to open the menu when swiped from right to left.
   */
  const handleSwipe = (e: TouchEvent) => {
    const startX = e.changedTouches[0].clientX;
    const threshold = 25; // Swipe threshold to trigger menu opening

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endX = endEvent.changedTouches[0].clientX;
      const distance = startX - endX;

      // If the swipe distance exceeds the threshold and the menu is closed, open it
      if (distance > threshold && !isMenuOpen) {
        setMenuOpen(true);
      }
    };

    document.addEventListener("touchend", handleTouchEnd, { once: true });
  };

  useEffect(() => {
    // Listen for swipe gestures to open the menu
    document.addEventListener("touchstart", handleSwipe);

    return () => {
      // Clean up event listener when component unmounts
      document.removeEventListener("touchstart", handleSwipe);
    };
  }, [isMenuOpen]);

  return (
    <header className="flex w-full items-center justify-between">
      {/* Logo Section */}
      <m.h1
        initial={{ opacity: 0, y: -25 }}
        animate={isRotatingComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        onMouseOver={mouseOverEvent}
        onMouseOut={mouseOutEvent}
        aria-label="Website logo"
        title="Homepage"
        tabIndex={0}
        className="font-rubik text-base uppercase"
      >
        club.
      </m.h1>

      {/* Hamburger Button */}
      <m.button
        initial={{ opacity: 0, y: -25 }}
        animate={isRotatingComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="z-50 flex h-full cursor-none flex-col items-center justify-center gap-1"
        onMouseOver={mouseOverEvent}
        onMouseOut={mouseOutEvent}
        onClick={handleMenuToggle}
        aria-label="Navigation menu"
        title={isMenuOpen ? "Close Menu" : "Open Menu"}
        type="button"
        tabIndex={0}
      >
        <span
          className={`h-1 w-6 rounded-full bg-white transition-transform duration-300 ${
            isMenuOpen ? "translate-y-1 -rotate-45" : ""
          }`}
        ></span>
        <span
          className={`h-1 w-6 rounded-full bg-white transition-transform duration-300 ${
            isMenuOpen ? "-translate-y-1 rotate-45" : ""
          }`}
        ></span>
      </m.button>

      {/* Navigation Menu */}
      {isMenuOpen && (
        <m.div
          onClick={handleClose}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          transition={{ ease: "easeInOut" }}
          ref={scope}
          className="fixed inset-0 z-40 h-screen w-full"
        >
          <m.div
            id="drawer"
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            style={{ x }}
            transition={{ ease: "easeInOut" }}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.5 }}
            onDragEnd={() => {
              if (x.get() > 50) {
                handleClose();
              }
            }}
            drag="x"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 right-0 h-full w-full overflow-hidden rounded-l-2xl bg-[#202020] shadow-lg shadow-white"
          >
            {/* Drag handle to close the menu */}
            <div className="absolute bottom-0 left-0 top-0 z-50 flex items-center justify-center bg-[#202020] p-4"></div>
          </m.div>
        </m.div>
      )}
    </header>
  );
};

export default Header;
