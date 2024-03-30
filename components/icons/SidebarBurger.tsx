import React from "react";
import { cn } from "@/lib/utils";
import { SidebarButtonProps } from "@/lib/interface";
import { Button } from "@/components/ui/button";
export const SidebarBurger = (props: SidebarButtonProps) => {
  const { className, callback } = props;
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => {
        callback((prev) => !prev);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width="100%"
        height="100%"
        className={cn("w-6 h-6", className)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
        />
      </svg>
    </Button>
  );
};
