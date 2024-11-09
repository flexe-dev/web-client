import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { cn } from "@/lib/util/utils";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";

interface Props extends ChildNodeProps {
  id: string;
}

export const ImageCarouselVisualEffect = ({ children, id }: Props) => {
  const { setNodeRef, isOver, active } = useDroppable({ id: id });
  const [imageCarouselStyling, setImageCarouselStyling] =
    useState<boolean>(false);

  useEffect(() => {
    if (isOver && active?.id.toString().includes("image")) {
      setImageCarouselStyling(true);
      return;
    }
    setImageCarouselStyling(false);
  }, [isOver]);

  return (
    <div
      className={cn("transition-opacity", imageCarouselStyling && "opacity-60")}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};
