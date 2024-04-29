"use client";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import { ChildNodeProps, ClassNameProp } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { CSSProperties, forwardRef } from "react";

interface Props extends ChildNodeProps, ClassNameProp {
  id: string;
}
export const BlockWrapper = ({ className, children, id }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-5/6 mx-4 my-2 h-[8rem] cursor-pointer  rounded-md border-2 border-dashed hover:border-solid hover:border-primary transition-all"
    >
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
