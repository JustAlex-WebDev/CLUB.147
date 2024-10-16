import React from "react";

// Define prop types for RotatingCircleText
interface RotatingCircleTextProps {
  isRotatingComplete?: boolean;
}

const RotatingCircleText: React.FC<RotatingCircleTextProps> = ({
  isRotatingComplete = true, // Default value
}) => {
  return (
    <svg
      className={`absolute h-[130%] w-[130%] animate-rotate-circle transition-opacity duration-700 ease-in-out ${isRotatingComplete ? "opacity-1" : "opacity-0"}`}
      viewBox="0 0 450 450"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Define the circular path */}
      <path
        id="circlePath"
        d="M 225, 225
         m -190, 0
         a 190,190 0 1,1 380,0
         a 190,190 0 1,1 -380,0"
        fill="transparent"
      />
      {/* Text that follows the circular path */}
      <text className="font-rubik fill-white text-[8px] uppercase tracking-[6px]">
        <textPath
          href="#circlePath"
          startOffset="0"
          textLength="1190"
          lengthAdjust="spacingAndGlyphs"
        >
          club.147 club.147 club.147 club.147 club.147 club.147 club.147
          club.147 club.147 club.147 club.147
        </textPath>
      </text>
    </svg>
  );
};

export default RotatingCircleText;
