import { usePostComments } from "@/components/context/User/PostComments/PostCommentContext";
import { Button } from "@/components/ui/Shared/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/Shared/dialog";
import { toTitleCase } from "@/lib/util/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FC } from "react";
import { LinkedCommentProps } from "../Comment";
import { CommentAction } from "./CommentActions";

interface Props extends LinkedCommentProps {
  type?: CommentAction;
  callback: () => void;
}

export const CommentActionConfirmModal: FC<Props> = ({
  type,
  callback,
  comment,
}) => {
  const { deleteComment } = usePostComments();
  const confirmAction: Record<CommentAction, () => void> = {
    delete: () => deleteComment(comment),
    report: () => console.log("Report Comment"),
    pin: () => console.log("Pin Comment"),
  };
  if (!type) return null;

  return (
    <DialogPortal>
      <DialogOverlay></DialogOverlay>
      <DialogContent>
        <DialogHeader>{toTitleCase(type)} This Comment?</DialogHeader>
        <DialogDescription>
          Are you sure you want to {type} this comment?
        </DialogDescription>
        <DialogFooter>
          <Button variant={"outline"} onClick={callback}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              confirmAction[type]();
              callback();
            }}
          >
            {toTitleCase(type)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};
