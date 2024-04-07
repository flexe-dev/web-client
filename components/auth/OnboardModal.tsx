"use client";
import { useEffect, useState } from "react";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { OnboardForm } from "../forms/OnboardForm";
import { useAccount } from "../context/AccountProvider";

export const OnboardModal = () => {
  const { user, profile } = useAccount();

  //Only performing state operations due to Hydration Issues
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    setModalOpen(!user?.onboarded);
  }, []);

  const handleFinishOnboard = () => {
    setModalOpen(false);
  };
  if (!user || !profile) return null;
  return (
    <AlertDialog open={modalOpen}>
      <AlertDialogContent className="w-full md:min-w-[45rem] lg:min-w-[50rem]">
        <>
          <AlertDialogHeader className="text-3xl font-semibold">
            Welcome to designs.dev
          </AlertDialogHeader>
          <AlertDialogDescription className="text-secondary-foreground flex flex-col">
            <span>
              Lets grab some more details to finish setting up your account
            </span>
            <span className="text-xs text-secondary-header mt-1">
              Your information can be changed in the settings page at any time
            </span>
          </AlertDialogDescription>
          <OnboardForm onSuccess={handleFinishOnboard} />
        </>
      </AlertDialogContent>
    </AlertDialog>
  );
};
