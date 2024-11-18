import { ToolModalProp } from "@/components/context/User/PostTools/PostOptionToolProvider";
import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/Shared/dialog";

const SharePostModal = (props: ToolModalProp) => {
  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogContent>
        <DialogHeader>Share Post</DialogHeader>
      </DialogContent>
    </DialogPortal>
  );
};

export default SharePostModal;
