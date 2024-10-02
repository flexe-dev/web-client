"use client";
import { ChildNodeProps, ClassNameProp } from "@/lib/interface";
import { cn } from "@/lib/util/utils";

interface Props extends ChildNodeProps, ClassNameProp {}
export const BlockWrapper = ({ className, children }: Props) => {
  return (
    <div className="relative w-5/6 mx-4 my-2 h-[8rem] cursor-pointer  rounded-md border-2 border-dashed hover:border-solid hover:border-primary transition-all">
      <div
        className={cn(
          "relative flex flex-col h-full justify-center items-center mx-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
