import React from "react";
export const BackgroundGrid = () => {
  return (
    <>
      <div className="absolute inset-0 h-[15rem] w-screen -z-[99]  bg-[image:radial-gradient(70%_60%_at_50%_-20%,hsl(0,0%,32%,0.35),rgba(255,255,255,0))]"></div>

      <svg
        className="absolute inset-0 -z-[99] h-[60rem] w-screen stroke-neutral-800/30 dark:stroke-neutral-200/20 [mask-image:radial-gradient(40%_40%_at_top_center,white,transparent)]"
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
