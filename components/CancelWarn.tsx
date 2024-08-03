"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { ModalProps } from "@/lib/interface";
import { Button } from "./ui/button";

interface Props extends ModalProps {
  path: string;
}

const CancelWarn = ({ path, open: visible, callback }: Props) => {
  const router = useRouter();

  const onConfirm = () => {
    router.push(path);
  };

  return (
    <Dialog modal={true} open={visible} onOpenChange={callback}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            All progress will be lost if you proceed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button variant={"destructive"} onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelWarn;
