import React, { useState } from "react";

// Animation Libraries
import { easeInOut, motion as m } from "framer-motion";

// Icons
import { FiInstagram, FiPhone } from "react-icons/fi";

// Context
import { useCursorContext } from "../context/CursorContext";

// Define props interface
interface FooterProps {
  lineHeight: string;
  isRotatingComplete: boolean;
}

/**
 * Footer component
 * Displays the footer section of the page,
 * which includes social links and copyright information.
 *
 * @param {FooterProps} props - The properties for the Footer component.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer: React.FC<FooterProps> = ({ lineHeight, isRotatingComplete }) => {
  const { mouseOverEvent, mouseOutEvent } = useCursorContext();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false); // Track the completion of the animation

  return (
    <footer className="relative flex w-full justify-between pb-6 text-xs font-semibold tracking-wider">
      {/* Socials */}
      <m.div
        initial={{ opacity: 0 }}
        animate={isRotatingComplete ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        aria-label="Website name and socials"
        title="Instagram"
        tabIndex={0}
        onMouseOver={mouseOverEvent}
        onMouseOut={mouseOutEvent}
        className="flex items-center justify-center gap-2"
      >
        <FiInstagram size={14} />

        <span>club.147</span>
      </m.div>

      {/* Contact Information */}
      <m.div
        initial={{ opacity: 0 }}
        animate={isRotatingComplete ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        aria-label="Contact number"
        title="Call Us"
        tabIndex={0}
        className="flex items-center justify-center gap-2"
      >
        <FiPhone size={14} />

        <span>
          088 495 5525
          {/* © 2024 - All rights reserved. */}
        </span>
      </m.div>

      {/* Dynamic Height Line */}
      <m.div
        initial={{ opacity: 0 }}
        animate={isRotatingComplete ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2 }}
        className={`absolute bottom-0 left-1/2 -z-50 w-2 rounded-full rounded-b-none bg-white transition-all duration-300 ${lineHeight}`}
      />

      {/* Conditionally render the second div based on animation completion */}
      {!isAnimationComplete && (
        <m.div
          initial={{ height: 0 }}
          animate={isRotatingComplete ? { height: "15vh" } : {}}
          exit={{ height: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: easeInOut }}
          className="absolute bottom-0 left-1/2 -z-50 w-2 rounded-full rounded-b-none bg-white transition-all duration-300"
          onAnimationComplete={() => {
            setTimeout(() => {
              setIsAnimationComplete(true);
            }, 1000);
          }}
        />
      )}
    </footer>
  );
};

export default Footer;
