"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { OnboardForm } from "../forms/OnboardForm";
import { useAccount } from "../context/AccountProvider";

export const OnboardModal = () => {
  const { user } = useAccount();

  //Only performing state operations due to Hydration Issues
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    setModalOpen(!user?.onboarded);
  }, []);

  const handleFinishOnboard = () => {
    setModalOpen(false);
  };
  if (!user) return null;
  return (
    <Dialog open={modalOpen}>
      <DialogContent
        className="w-full md:min-w-[45rem] lg:min-w-[50rem] "
        hasCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <>
          <DialogHeader className="text-3xl font-semibold">
            Welcome to designs.dev
          </DialogHeader>
          <DialogDescription className="text-secondary-foreground flex flex-col">
            <span>
              Lets grab some more details to finish setting up your account
            </span>
            <span className="text-xs text-secondary-header mt-1">
              Your information can be changed in the settings page at any time
            </span>
          </DialogDescription>
          <OnboardForm onSuccess={handleFinishOnboard} />
        </>
      </DialogContent>
    </Dialog>
  );
};
