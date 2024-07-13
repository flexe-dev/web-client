import { usePostComments } from "@/components/context/PostCommentContext";
import { toTitleCase } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../../button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "../../dialog";
import { CommentAction, NodeTraversalProps } from "./CommentActions";

interface Props extends NodeTraversalProps {
  type?: CommentAction;
  callback: () => void;
}

export const CommentActionConfirmModal = (props: Props) => {
  const { type, callback, node, root } = props;
  const { deleteComment } = usePostComments();
  const confirmAction: Record<CommentAction, () => void> = {
    delete: () => deleteComment(node, root),
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
