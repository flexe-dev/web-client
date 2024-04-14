"use client";
import { SetStateAction, useEffect, useState } from "react";
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ProfileDetailsForm } from "@/components/forms/ProfileDetailsForm";
import { useAccount } from "@/components/context/AccountProvider";

interface EditProfileModalProps {
  open: boolean;
  dispatch: React.Dispatch<SetStateAction<boolean>>;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  dispatch,
}) => {
  return (
    <Dialog open={open} onOpenChange={dispatch}>
      <DialogContent className="w-full md:min-w-[45rem] lg:min-w-[50rem] ">
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
