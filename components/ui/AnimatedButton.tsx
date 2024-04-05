import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ClassNameProp } from "@/lib/interface";
interface ButtonWrapperProps extends ClassNameProp {
  children: React.ReactNode;
}

export const BgTransitionButton = (props: ButtonWrapperProps) => {
  const { children, className } = props;
  return (
    <Button
      variant={"outline"}
      className={cn(
        "relative overflow-hidden group/button border-inverted hover:bg-transparent",
        className
      )}
    >
      <div className="h-full w-full transition-transform scale-x-100 group-hover/button:scale-x-0 bg-inverted absolute z-10 duration-300 origin-left group-hover:origin-right" />
      <div className="z-20 text-inverted-foreground group-hover/button:text-inverted duration-500">
        {children}
      </div>
    </Button>
  );
};
