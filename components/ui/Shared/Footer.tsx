import React from "react";
import { GlowingStarsBackgroundCard } from "./glowing-stars";
import { StyledWordLink } from "./StyledWorkLink";
import Link from "next/link";

interface Link {
  name: string;
  href: string;
}
const links: Link[] = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Projects", href: "/projects" },
  { name: "Discussions", href: "/discussions" },
  { name: "Pricing", href: "/pricing" },
];

export const Footer = () => {
  return (
    <footer className="bg-background relative pb-8 md:mb-4 md:h-[15rem] flex flex-col md:flex-row overflow-hidden w-screen z-[30] border-t-2 antialiased ">
      <GlowingStarsBackgroundCard className="absolute top-0 opacity-60 z-0 " />
      <div className="w-full h-full flex flex-col pt-12 mx-8 md:ml-[6rem] lg:ml-[8rem] xl:ml-[12rem] z-[20]">
        <div className="text-4xl font-semibold">FLEXE.dev</div>
        <div className="text-secondary-header mt-4 mr-8 md:mr-0">
          An Innovative Networking Application for Developers and Developer
          Groups
        </div>
        <div className="mt-2">
          Created By{" "}
          <StyledWordLink newTab href="https://github.com/Dawaad">
            Dawad
          </StyledWordLink>
        </div>
      </div>
      <div className="w-full z-[20] h-full mx-8 pt-4 md:pt-12">
        <div className="text-2xl font-semibold mt-8 md:mt-0">Resources</div>
        <div className="flex flex-row flex-wrap mt-4 gap-y-4">
          {links.map((link, index) => (
            <Link
              className="w-1/2 md:w-1/3 italic text-secondary-header hover:text-primary transition-colors"
              key={index}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
