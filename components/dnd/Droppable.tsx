import { ChildNodeProps } from "@/lib/interface";
import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface Props extends ChildNodeProps {
  id: string;
}

const Droppable = ({ children, id }: Props) => {
  const { setNodeRef, over, isOver } = useDroppable({
    id: id,
  });
  return (
    <div ref={setNodeRef} className="h-full w-full flex flex-col space-y-4">
      {children}
    </div>
  );
};

export default Droppable;
