import React from "react";
export const BackgroundGrid = () => {
  return (
    <>
      <div className="absolute inset-0  bg-[image:radial-gradient(70%_65%_at_50%_-20%,hsl(206,81.9%,65.3%,0.5),rgba(255,255,255,0))]"></div>

      <svg
        className="absolute inset-0  h-full w-full stroke-white/20 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hero"
            width="80"
            height="80"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#hero)"
        ></rect>
      </svg>
    </>
  );
};

export default BackgroundGrid;
