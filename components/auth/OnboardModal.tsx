"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
export const OnboardModal = () => {
  const user = useSession().data?.user;
  if (!user) return null;
  //Only performing state operations due to Hydration Issues
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    setModalOpen(!user?.onboarded);
  }, []);

  const handleFinishOnboard = () => {
    setModalOpen(false);
  };
  return (
    <Dialog open={modalOpen}>
      <DialogContent
        className="min-w-[40rem]"
        hasCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-3xl font-semibold">
         Welcome to designs.dev
        </DialogHeader>
        <DialogDescription className="text-secondary-foreground">
          Lets grab some more details to finish setting up your account
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
