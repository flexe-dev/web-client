import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";
interface Props extends ChildNodeProps {
  id: string;
}

export function Draggable(props: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
  };

  return (
    <button
      className="w-full h-full"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
