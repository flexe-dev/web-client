"use client";

import { LinkProps } from "@/lib/interface";
import {
  BriefcaseIcon,
  CodeBracketIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { User } from "next-auth";
import Link from "next/link";
import { useAccount } from "./context/AccountProvider";
import { AppLogo } from "./logo";
import { ModeToggle } from "./theme/theme-toggle";
import AuthProfile from "./ui/AuthProfile";
import MobileView from "./ui/MobileNav";
import { NavSearch } from "./ui/Search/NavSearch";

//Styling for the Navbar main logo

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
      href: `/${user?.username}/posts`,
      label: "My Work",
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
      <nav className="sticky top-0 lg:pl-4 pr-8 z-[50] h-[5rem] border-b-2 backdrop-blur-xl w-[100dvw] flex ">
        <Link href={"/"} className="w-32 flex items-center mb-2 lg:w-fit">
          <AppLogo className="mx-4 mt-2 cursor-pointer" />
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
