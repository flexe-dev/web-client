import { ToolModalProp } from "@/components/context/PostOptionToolProvider";
import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";

const DeletePostModal = (props: ToolModalProp) => {
  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogContent>
        <DialogHeader>Delete This Post?</DialogHeader>
      </DialogContent>
    </DialogPortal>
  );
};

export default DeletePostModal;
