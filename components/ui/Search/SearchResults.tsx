import React from "react";

interface SearchResultsProps {
  inFocus: boolean;
  searchQuery: string;
}

export const SearchResults = ({ inFocus, searchQuery }: SearchResultsProps) => {
  return (
    <div
      className={`w-[20rem] z-[80] ml-3 mt-2 transition-all rounded-md bg-primary absolute ${
        inFocus ? "h-80 opacity-100 scale-y-100" : "h-70 opacity-0 scale-y-80"
      }`}
    ></div>
  );
};
