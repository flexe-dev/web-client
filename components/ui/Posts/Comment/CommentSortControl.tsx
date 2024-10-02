"use client";

import { usePostComments } from "@/components/context/PostCommentContext";
import { SortCriteria, sortTypes } from "@/lib/interface";
import { toTitleCase } from "@/lib/util/utils";
import {
  ArrowDownIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";

interface SortLayout {
  key: SortCriteria;
  layout: React.ReactNode;
}

export const CommentSortControl = () => {
  const { setSortType, sortType } = usePostComments();

  const SortTypeVisual: Record<SortCriteria, SortLayout> = {
    NEWEST: {
      key: "NEWEST",
      layout: (
        <div className="flex">
          <div className="p-1">
            <ArrowDownIcon className="w-6 h-6" />
          </div>
          <div className="ml-3">
            <div className="font-bold">Newest</div>
            <div className="text-secondary-header text-sm">
              See the most recent comments first
            </div>
          </div>
        </div>
      ),
    },
    OLDEST: {
      key: "OLDEST",
      layout: (
        <div className="flex my-1">
          <div className="p-1">
            <ArrowUpIcon className="w-6 h-6" />
          </div>
          <div className="ml-3">
            <div className="font-bold">Oldest</div>
            <div className="text-secondary-header text-sm">
              See the oldest comments first
            </div>
          </div>
        </div>
      ),
    },
    TOP: {
      key: "TOP",
      layout: (
        <div className="flex">
          <div className="p-1">
            <ArrowTrendingUpIcon className="w-6 h-6" />
          </div>
          <div className="ml-3">
            <div className="font-bold">Top</div>
            <div className="text-secondary-header">
              See the most liked comments first
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <DropdownMenu modal={false}>
      <div className="w-full flex items-center mt-2">
        <div className="text-sm text-secondary-header">Sort By: </div>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="ml-1 h-8 w-fit px-2 font-extrabold"
          >
            {toTitleCase(sortType)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-2">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          {sortTypes.map((type) => (
            <DropdownMenuItem
              key={`sort-item-${type}`}
              onClick={() => setSortType(type)}
            >
              {SortTypeVisual[type].layout}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};
