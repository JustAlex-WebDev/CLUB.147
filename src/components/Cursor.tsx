import React, { useEffect, useState } from "react";

// Context
import { useCursorContext } from "../context/CursorContext";

/**
 * Cursor component
 * Displays a custom cursor that changes based on the cursor state.
 *
 * @returns {JSX.Element | null} A visual custom cursor that follows the mouse, or null if not visible.
 */
const Cursor: React.FC = () => {
  const { dot, cursor } = useCursorContext();

  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Function to handle window resize
    const handleResize = () => {
      if (window.innerWidth > 640 && !isMobile) {
        setIsCursorVisible(true); // Show custom cursor
      } else {
        setIsCursorVisible(false); // Hide custom cursor
      }
    };

    // Initial check on mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCursorImage = () => {
    return cursor === "default"
      ? "/images/cursorDefault.png"
      : "/images/cursorPointer.png";
  };

  return isCursorVisible ? (
    <img
      ref={dot}
      src={getCursorImage()}
      className="cursor-dot relative z-50"
      alt={`${cursor === "default" ? "Default" : "Pointer"} Cursor`}
    />
  ) : null;
};

export default Cursor;
