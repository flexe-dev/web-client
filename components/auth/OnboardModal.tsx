"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { OnboardForm } from "../forms/OnboardForm";
export const OnboardModal = () => {
  const user = useSession().data?.user;

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
        className="min-w-[50rem]"
        hasCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <>
          <DialogHeader className="text-3xl font-semibold">
            Welcome to designs.dev
          </DialogHeader>
          <DialogDescription className="text-secondary-foreground">
            Lets grab some more details to finish setting up your account
          </DialogDescription>
          <OnboardForm onSuccess={handleFinishOnboard} />
        </>
      </DialogContent>
    </Dialog>
  );
};
