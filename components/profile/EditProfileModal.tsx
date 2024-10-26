"use client";
import { ProfileDetailsForm } from "@/components/forms/ProfileDetailsForm";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/Shared/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import React, { SetStateAction } from "react";

interface EditProfileModalProps {
  open: boolean;
  dispatch: React.Dispatch<SetStateAction<boolean>>;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  dispatch,
}) => {
  return (
    <Dialog modal={true} open={open} onOpenChange={dispatch}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="mt-8 md:mt-0 w-full md:min-w-[45rem] lg:min-w-[50rem] ">
        <>
          <DialogDescription className="text-secondary-foreground flex flex-col">
            <span>Let's update your details!</span>
            <span className="text-xs text-secondary-header mt-1">
              Your information can be changed in the settings page at any time
            </span>
          </DialogDescription>
          <ProfileDetailsForm onSuccess={dispatch} />
        </>
      </DialogContent>
    </Dialog>
  );
};
