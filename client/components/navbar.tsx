import React from "react";
import { Logo } from "./logo";
import { ModeToggle } from "./theme/theme-toggle";
import Link from "next/link";
import AuthProfile from "./ui/AuthProfile";
import { LinkProps } from "@/navigation";
import MobileView from "./ui/MobileNav";
import { link } from "fs";
export const MainNavbar = () => {
  return <nav></nav>;
};

//Styling for the Navbar main logo
const logoProps = {
  className: "ml-4 mt-2 h-16 w-fit cursor-pointer",
  //Used for primary text
  foreground: "fill-neutral-950/90 dark:fill-gray-400/90",
  secondary: {
    //Used for secondary text and shape based objects
    fill: "fill-neutral-600 dark:fill-neutral-300",
    //Used for secondary path based objects
    stroke: "stroke-neutral-600 dark:stroke-neutral-300",
  },
};

const links: LinkProps[] = [
  { href: "/portfolios", label: "Portfolios" },
  { href: "/projects", label: "Projects" },
  { href: "/forumn", label: "Discussions" },
];

export const Navbar = () => {
  return (
    <nav className="fixed z-30 px-4 h-[5rem] border-b border-b-neutral-300 dark:border-b-neutral-700 backdrop-blur-lg w-screen flex items-center">
      <Link href={"/"}>
        <Logo {...logoProps} />
      </Link>
      <section className="flex flex-grow items-center justify-end space-x-4">
        <DesktopLayout />
        <AuthProfile />
        <ModeToggle />
        <MobileView links={links} />
      </section>
    </nav>
  );
};

export const DesktopLayout = () => {
  return (
    <>
      <div className="hidden lg:flex space-x-4 lg:space-x-6 mr-6 text-sm lg:text-base ">
        {links.map((link) => {
          return (
            <Link
              key={`navbar-link-${link.label}`}
              href={link.href}
              className="group"
            >
              <span>{link.label}</span>
              <div className="h-[1px] w-full bg-inverted scale-x-0 group-hover:scale-x-100  group-hover:origin-left origin-center transform transition-transform  "></div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
