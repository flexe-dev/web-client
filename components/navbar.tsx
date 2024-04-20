"use client";

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
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { link } from "fs";
import { NavSearch } from "./ui/Search/NavSearch";
import { useAccount } from "./context/AccountProvider";
import { User } from "@prisma/client";

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

export const Navbar = () => {
  const { user } = useAccount();
  const links: LinkProps[] = [
    { href: "/feed", label: "Feed", icon: <InboxIcon />, restrict: true },
    {
      href: "/network",
      label: "My Network",
      restrict: true,
      icon: <UserGroupIcon />,
    },
    {
      href: `/${user?.username}/portfolio`,
      label: "My Portfolio",
      restrict: true,
      icon: <BriefcaseIcon />,
    },
    {
      href: "/gallery",
      label: "Inspiration",
      icon: <CodeBracketIcon />,
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[90] lg:pl-4 pr-8 h-[5rem] border-b-2 backdrop-blur-xl w-[100dvw] flex ">
        <Link href={"/"} className="w-32 lg:w-fit">
          <AppLogo {...logoProps} />
        </Link>
        <section className="flex flex-grow items-end h-full justify-end md:justify-end ">
          <NavSearch />
          <div className="flex items-center  space-x-3 h-full">
            <DesktopLayout links={links} user={user} />
            <AuthProfile />
            <ModeToggle className="hidden md:flex" variant="default" />
          </div>
        </section>
      </nav>
      <MobileView links={links} />
    </>
  );
};

interface DesktopLayoutProps {
  links: LinkProps[];
  user?: User;
}

export const DesktopLayout = ({ links, user }: DesktopLayoutProps) => {
  return (
    <>
      <div className="hidden md:flex md:space-x-6 lg:space-x-4  xl:space-x-6  mr:3 lg:mr-4 text-sm h-full items-end pb-2">
        <Link
          key={`navbar-link-search`}
          href={"/search"}
          className="group lg:hidden"
        >
          <div className="flex flex-col items-center space-y-1 ">
            <div className="w-6 h-6">
              <MagnifyingGlassIcon />
            </div>
            <span>Search</span>
          </div>
          <div className="h-[1px] w-full bg-inverted scale-x-0 group-hover:scale-x-100  group-hover:origin-left origin-center transform transition-transform  "></div>
        </Link>
        {links.map((link) => {
          return (
            (!link.restrict || user) && (
              <Link
                key={`navbar-link-${link.label}`}
                href={link.href}
                className="group"
              >
                <div className="flex flex-col items-center space-y-1 ">
                  <div className="w-6 h-6">{link.icon}</div>
                  <span>{link.label}</span>
                </div>
                <div className="h-[1px] w-full bg-inverted scale-x-0 group-hover:scale-x-100  group-hover:origin-left origin-center transform transition-transform  "></div>
              </Link>
            )
          );
        })}
      </div>
    </>
  );
};
