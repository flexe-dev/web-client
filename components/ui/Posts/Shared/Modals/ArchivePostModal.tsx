import { ToolModalProp } from "@/components/context/User/PostTools/PostOptionToolProvider";
import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/Shared/dialog";

const ArchivePostModal = (props: ToolModalProp) => {
  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogContent>
        <DialogHeader>Archive This Post?</DialogHeader>
      </DialogContent>
    </DialogPortal>
  );
};

export default ArchivePostModal;
