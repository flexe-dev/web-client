"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "../input";
import Link from "next/link";
import { SearchResults } from "./SearchResults";
import { AnimatePresence } from "framer-motion";
export const NavSearch = () => {
  const [inFocus, setInFocus] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="hidden ml-4 xl:ml-8 transition-all lg:flex flex-grow items-end pb-2 relative  text-sm">
        <div className="group">
          <NavLinkIcon inFocus={inFocus} searchQuery={search} />
          <div
            className="relative"
            onFocus={() => setInFocus(true)}
            onBlur={() => setInFocus(false)}
          >
            <Input
              placeholder="Search for anything"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`z-[80] ml-3 pl-12 h-12 transition-all origin-left  ${
                inFocus
                  ? "w-60 xl:w-80"
                  : "w-0 group-hover:w-60 xl:group-hover:w-80 opacity-0 group-hover:opacity-100"
              } `}
            />
            <AnimatePresence>
              {inFocus && <SearchResults searchQuery={search} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {inFocus && (
        <div className="h-screen w-screen absolute inset-x-0 bottom-0 top-[5rem] bg-neutral-950/80 "></div>
      )}
    </>
  );
};

interface Props {
  inFocus: boolean;
  searchQuery?: string;
}
const NavLinkIcon = ({ inFocus, searchQuery }: Props) => {
  return (
    <Link
      href={`/search/${searchQuery}`}
      className="absolute flex flex-col items-center space-y-1 left-0 "
    >
      <MagnifyingGlassIcon
        className={`w-6 h-6 z-[90] duration-200 transition-transform ${
          inFocus
            ? "translate-y-3 translate-x-3"
            : "group-hover:translate-y-3 group-hover:translate-x-3"
        }`}
      />
      <span
        className={` group-hover: transition-opacity ${
          inFocus ? "opacity-0" : "opacity-100 group-hover:opacity-0"
        }`}
      >
        Search
      </span>
    </Link>
  );
};
