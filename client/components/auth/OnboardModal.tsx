"use client";
import { useEffect, useState } from "react";
import { useAccount } from "../context/AccountProvider";
import { OnboardForm } from "../forms/OnboardForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "../ui/alert-dialog";

export const OnboardModal = () => {
  const { account } = useAccount();
  //Only performing state operations due to Hydration Issues
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!account) return;
    setModalOpen(!account?.user.onboarded);
  }, [account]);

  if (!account) return null;

  const handleFinishOnboard = () => {
    setModalOpen(false);
  };
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
