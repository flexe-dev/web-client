import { ToolModalProp } from "@/components/context/User/PostOptionToolProvider";
import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/Shared/dialog";

const BoostPostModal = (props: ToolModalProp) => {
  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogContent>
        <DialogHeader>Boost Post</DialogHeader>
      </DialogContent>
    </DialogPortal>
  );
};

export default BoostPostModal;
