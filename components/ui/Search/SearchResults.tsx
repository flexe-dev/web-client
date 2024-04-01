import React from "react";
import { Button } from "../button";
import { Avatar, AvatarFallback } from "../avatar";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";
interface SearchResultsProps {
  searchQuery: string;
}

export const SearchResults = ({ searchQuery }: SearchResultsProps) => {
  return (
    <motion.div
      className={`border-2 w-[20rem] min-h-80 h-auto z-[80] -left-10 xl:left-0 ml-3 mt-3 transition-all rounded-md bg-popover absolute `}
    >
      <div className="text-neutral-800 flex items-center justify-between my-2 ml-4 mr-2">
        <h2 className="text-lg font-semibold text-secondary-foreground">
          Recent
        </h2>
        <Button className="text-secondary-header" size={"sm"} variant={"ghost"}>
          Clear
        </Button>
      </div>
      <hr className="border" />
      <section className="mx-4 my-2">
        <div className="flex justify-between">
          <h2 className="font-semibold">People</h2>
          <Link
            className="text-secondary-header hover:text-secondary-foreground"
            href={"/profile/dawad"}
          >
            See All
          </Link>
        </div>
        <div className="flex space-x-3 my-3 items-end justify-center">
          {Array.from({ length: 5 }, (i, v) => (
            <div className={`flex flex-col space-y-1 hover:brightness-75`}>
              <Avatar className={`cursor-pointer w-12 h-12`}>
                <AvatarFallback>DD</AvatarFallback>
              </Avatar>
              <div className={`w-12 flex-wrap line-clamp-2 transition-colors`}>
                Jared Neil Tucker
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="border" />
      <section className="my-2">
        <h2 className="mx-4 font-semibold">Searches</h2>
      </section>
      <div>
        {Array.from({ length: 4 }, (i, v) => (
          <div className="flex space-x-3 text-secondary-header py-2 items-center px-3 hover:bg-secondary transition-all">
            <ClockIcon className="w-4 h-4 " />
            <span>Search {v}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
