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
import { CommentAction } from "./CommentActions";

interface Props {
  type?: CommentAction;
  callback: () => void;
}

const confirmAction: Record<CommentAction, () => void> = {
  delete: () => console.log("Delete Comment"),
  report: () => console.log("Report Comment"),
  pin: () => console.log("Pin Comment"),
};

export const CommentActionConfirmModal = (props: Props) => {
  const { type, callback } = props;

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
          <Button onClick={confirmAction[type]}>{toTitleCase(type)}</Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};
