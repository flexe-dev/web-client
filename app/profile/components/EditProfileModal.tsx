"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ProfileDetailsForm } from "@/components/forms/ProfileDetailsForm";
import { useAccount } from "@/components/context/AccountProvider";

interface EditProfileModalProps {
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
}) => {
  const handleFinishOnboard = () => {
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="w-full md:min-w-[45rem] lg:min-w-[50rem] "
        hasCloseButton={true}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <>
          <DialogDescription className="text-secondary-foreground flex flex-col">
            <span>Let's update your details!</span>
            <span className="text-xs text-secondary-header mt-1">
              Your information can be changed in the settings page at any time
            </span>
          </DialogDescription>
          <ProfileDetailsForm onSuccess={handleFinishOnboard} />
        </>
      </DialogContent>
    </Dialog>
  );
};
