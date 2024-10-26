import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { UseLoginModal } from "../context/User/LoginModalProvider";
import { Button } from "../ui/Shared/button";
import { Dialog, DialogContent } from "../ui/Shared/dialog";
import ThirdParty from "./ThirdPartyAuth";

export const LoginModal: React.FC = () => {
  const { isOpen, setOpen } = UseLoginModal();
  const path = usePathname();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="flex items-center flex-col max-w-md px-8">
        <section className="flex flex-col items-center">
          <h1 className="text-2xl mt-6 mb-1 font-bold">Log into Flexe.Dev</h1>
          <h2 className="text-tertiary text-center mb-8">
            To interact with other users, you need to be signed into your own
            account.
          </h2>
        </section>
        <section>
          <Link href="/auth/login" className="w-full">
            <Button className="flex w-full relative" variant={"outline"}>
              <UserIcon className="w-6 h-6 absolute left-2" />
              <div>Sign In With Email</div>
            </Button>
          </Link>
          <div className="w-full">
            <ThirdParty
              className="mt-2 mb-4"
              iconClass="absolute w-5 h-5 left-2"
              text="Continue with"
              callback={path}
            />
          </div>
        </section>
        <footer className="border-t py-4 mt-6 w-full flex justify-center">
          <div className="text-tertiary text-sm mr-2">
            Don't have an account?{" "}
          </div>
          <Link href={"/auth/register"}>
            <div className="font-semibold text-sm">Sign Up</div>
          </Link>
        </footer>
      </DialogContent>
    </Dialog>
  );
};
