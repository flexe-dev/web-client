"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { ChildNodeProps } from "@/lib/interface";

interface Props {
  path: string;
  modalVisible: boolean;
  callback: Dispatch<SetStateAction<boolean>>;
}

const CancelWarn = ({ path, modalVisible: visible, callback }: Props) => {
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
