import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { DragHandle } from "@/components/dnd/Sortable";
import { ChildNodeProps, ClassNameProp } from "@/lib/interface";
import React from "react";
import { cn } from "@/lib/utils";

interface Props extends ChildNodeProps, ClassNameProp {}

const ContentWrapper = ({ children, className }: Props) => {
  const { previewMode } = usePostCreator();
  return (
    <div
      className={cn("border-2 bg-background/80 w-full rounded-md", className)}
    >
      {children}
      <DragHandle className="absolute right-3 top-1/2 -translate-y-[50%] " />
    </div>
  );
};

export default ContentWrapper;
