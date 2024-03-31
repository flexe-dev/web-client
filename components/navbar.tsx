import React from "react";
import { AppLogo } from "./logo";
import { ModeToggle } from "./theme/theme-toggle";
import Link from "next/link";
import AuthProfile from "./ui/AuthProfile";
import { LinkProps } from "@/lib/interface";
import MobileView from "./ui/MobileNav";
import {
  InboxIcon,
  UserGroupIcon,
  CodeBracketIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
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
  { href: "/feed", label: "Feed", icon: <InboxIcon /> },
  {
    href: "/network",
    label: "My Network",
    icon: <UserGroupIcon />,
  },
  {
    href: "/portfolio",
    label: "My Portfolio",
    icon: <BriefcaseIcon />,
  },
  {
    href: "/gallery",
    label: "Inspiration",
    icon: <CodeBracketIcon />,
  },
];

export const Navbar = () => {
  return (
    <>
      <nav className="sticky z-30 pl-4 pr-8 h-[5rem] border-b-2 backdrop-blur-xl w-screen flex items-center">
        <Link href={"/"}>
          <AppLogo {...logoProps} />
        </Link>
        <section className="flex flex-grow items-center justify-end space-x-3">
          <DesktopLayout />
          <AuthProfile />
          <ModeToggle className="hidden md:flex" variant="default" />
        </section>
      </nav>
      <MobileView links={links} />
    </>
  );
};

export const DesktopLayout = () => {
  return (
    <>
      <div className="hidden md:flex space-x-4 lg:space-x-6  mr:3 lg:mr-6 text-sm  ">
        {links.map((link) => {
          return (
            <Link
              key={`navbar-link-${link.label}`}
              href={link.href}
              className="group "
            >
              <div className="flex flex-col items-center space-y-1 ">
                <div className="w-6 h-6">{link.icon}</div>
                <span>{link.label}</span>
              </div>
              <div className="h-[1px] w-full bg-inverted scale-x-0 group-hover:scale-x-100  group-hover:origin-left origin-center transform transition-transform  "></div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
