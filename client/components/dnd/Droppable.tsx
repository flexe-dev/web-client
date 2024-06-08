import { ChildNodeProps, ClassNameProp } from "@/lib/interface";
import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface Props extends ChildNodeProps, ClassNameProp {
  id: string;
}

const Droppable = ({ children, className, id }: Props) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });
  return (
    <div className={className} ref={setNodeRef}>
      {children}
    </div>
  );
};

export default Droppable;
