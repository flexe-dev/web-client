import { ChildNodeProps, ClassNameProp } from "@/lib/interfaces/componentTypes";
import { useDroppable } from "@dnd-kit/core";

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
