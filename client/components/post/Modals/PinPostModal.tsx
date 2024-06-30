"use client";

import { ToolModalProp } from "@/components/context/PostOptionToolProvider";
import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";

const PinPostModal = (props: ToolModalProp) => {
  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogContent>
        <DialogHeader>Pin Post</DialogHeader>
      </DialogContent>
    </DialogPortal>
  );
};

export default PinPostModal;
