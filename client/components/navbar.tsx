import React from "react";
import { Logo } from "./logo";
import { ModeToggle } from "./theme/theme-toggle";
import AuthProfile from "./ui/AuthProfile";
export const MainNavbar = () => {
  return <nav></nav>;
};

//Styling for the Navbar main logo
const logoProps = {
  className: "ml-4 mt-2 h-18 w-fit cursor-pointer",
  //Used for primary text
  foreground: "fill-neutral-950/90 dark:fill-gray-400/90",
  secondary: {
    //Used for secondary text and shape based objects
    fill: "fill-neutral-600 dark:fill-neutral-400/80",
    //Used for secondary path based objects
    stroke: "stroke-neutral-600 dark:stroke-neutral-400/80",
  },
};

export const LandingNavbar = () => {
  return (
    <nav className="fixed px-4 h-[5rem] border-b border-b-neutral-300 dark:border-b-neutral-700 backdrop-blur-lg w-screen flex items-center">
      <Logo {...logoProps} />
      <section className="flex flex-grow justify-end space-x-4">
        <AuthProfile />
        <ModeToggle />
      </section>
    </nav>
  );
};
